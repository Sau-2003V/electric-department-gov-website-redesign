-- =====================================================================
-- ELECTRICITY DEPARTMENT COMPLAINT PORTAL — SUPABASE/POSTGRESQL SCHEMA
-- =====================================================================

-- ---------------------------------------------------------------------
-- 0. EXTENSIONS
-- ---------------------------------------------------------------------
create extension if not exists pgcrypto;   -- gen_random_uuid()
create extension if not exists postgis;    -- geography type + nearest-neighbor
create extension if not exists pg_cron;    -- scheduled timeout sweep

-- ---------------------------------------------------------------------
-- 1. ENUM TYPES
-- ---------------------------------------------------------------------
create type public.app_role as enum ('consumer','agent','engineer','supervisor');
create type public.staff_role as enum ('engineer','supervisor'); -- Updated: contains only engineer & supervisor
create type public.complaint_priority as enum ('low','medium','high','critical'); 
create type public.complaint_status as enum (
  'open','pending_supervisor_review','engineer_assigned',
  'in_progress','resolved','closed','reopened','escalated'
);
create type public.assignment_status as enum (
  'unassigned','pending_supervisor_review','supervisor_approved',
  'auto_assigned','reassigned','completed','cancelled'
);
create type public.media_type as enum ('image','video','youtube','twitter','instagram');

-- ---------------------------------------------------------------------
-- 2. USERS (consumers)
-- ---------------------------------------------------------------------
create table public.users (
  id uuid not null,
  meter_number text not null,
  phone_number text not null,
  address text not null,
  pincode text not null,
  district text,
  state text,
  join_date timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint users_pkey primary key (id),
  constraint users_id_fkey foreign key (id) references auth.users(id) on delete cascade,
  constraint users_meter_number_key unique (meter_number),
  constraint users_phone_number_key unique (phone_number)
);
comment on table public.users is 'Consumers. Row is created automatically when a meter is installed.';

-- ---------------------------------------------------------------------
-- 3. STAFF (engineer / supervisor)
-- ---------------------------------------------------------------------
create table public.staff (
  id uuid not null,
  role public.staff_role not null,
  name text not null,
  phone_number text not null,
  supervisor_id uuid references public.staff(id), -- set for role='engineer'
  area text not null,
  district text,
  state text,
  longitude double precision,
  latitude double precision,
  location geography(Point,4326) generated always as (
    case when longitude is not null and latitude is not null
      then st_setsrid(st_makepoint(longitude, latitude), 4326)::geography
    end
  ) stored,
  is_available boolean not null default true,
  status text not null default 'active' check (status in ('active','inactive','suspended')),
  active_complaint_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint staff_pkey primary key (id),
  constraint staff_id_fkey foreign key (id) references auth.users(id) on delete cascade,
  constraint staff_phone_number_key unique (phone_number)
);
comment on table public.staff is 'Internal staff: engineers and supervisors. pincode, coverage radius, and rating fields removed.';

-- ---------------------------------------------------------------------
-- 4. COMPLAINTS
-- ---------------------------------------------------------------------
create table public.complaints (
  id uuid not null default gen_random_uuid(),
  ticket_number text unique,
  uid uuid,                               -- consumer; NULL = anonymous
  registered_by uuid references auth.users(id),
  registered_by_role public.app_role not null default 'consumer',
  phone text,                             -- fallback contact
  meter_number text default null,
  issue text not null,
  description text,
  priority public.complaint_priority not null default 'medium',
  status public.complaint_status not null default 'open',
  assignment_status public.assignment_status not null default 'unassigned',
  address text,
  landmark text,
  pincode text,
  district text,
  state text,
  longitude double precision,
  latitude double precision,
  location geography(Point,4326) generated always as (
    case when longitude is not null and latitude is not null
      then st_setsrid(st_makepoint(longitude, latitude), 4326)::geography
    end
  ) stored,
  is_anonymous boolean generated always as (uid is null) stored,
  assigned_engineer_id uuid references public.staff(id),
  assigned_supervisor_id uuid references public.staff(id),
  consumer_rating smallint check (consumer_rating between 1 and 5),
  resolved_at timestamptz,
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint complaints_pkey primary key (id),
  constraint complaints_uid_fkey foreign key (uid) references auth.users(id)
);
comment on table public.complaints is 'uid nullable => anonymous complaint.';

-- ---------------------------------------------------------------------
-- 5. COMPLAINT ASSIGNMENTS
-- ---------------------------------------------------------------------
create table public.complaint_assignments (
  id uuid not null default gen_random_uuid(),
  complaint_id uuid not null references public.complaints(id) on delete cascade,
  engineer_id uuid not null references public.staff(id),
  supervisor_id uuid references public.staff(id),
  status public.assignment_status not null default 'pending_supervisor_review',
  distance_meters double precision,
  requested_at timestamptz not null default now(),
  supervisor_response_deadline timestamptz,
  supervisor_responded_at timestamptz,
  created_at timestamptz not null default now(),
  constraint complaint_assignments_pkey primary key (id)
);

-- ---------------------------------------------------------------------
-- 6. COMPLAINT MEDIA / PROOFS
-- ---------------------------------------------------------------------
create table public.complaint_media (
  id uuid not null default gen_random_uuid(),
  complaint_id uuid not null references public.complaints(id) on delete cascade,
  media_type public.media_type not null,
  url text not null,
  storage_path text,
  thumbnail_url text,
  caption text,
  uploaded_by uuid not null references auth.users(id),
  uploaded_by_role public.app_role not null,
  created_at timestamptz not null default now(),
  constraint complaint_media_pkey primary key (id),
  constraint complaint_media_url_check check (url ~ '^https?://')
);

-- ---------------------------------------------------------------------
-- 7. COMPLAINT COMMENTS
-- ---------------------------------------------------------------------
create table public.complaint_comments (
  id uuid not null default gen_random_uuid(),
  complaint_id uuid not null references public.complaints(id) on delete cascade,
  author_id uuid not null references auth.users(id),
  author_role public.app_role not null,
  comment text not null check (char_length(btrim(comment)) > 0),
  is_internal boolean not null default false,
  created_at timestamptz not null default now(),
  constraint complaint_comments_pkey primary key (id)
);

-- ---------------------------------------------------------------------
-- 8. COMPLAINT TIMELINE
-- ---------------------------------------------------------------------
create table public.complaint_timeline (
  id uuid not null default gen_random_uuid(),
  complaint_id uuid not null references public.complaints(id) on delete cascade,
  event_type text not null,
  event_data jsonb not null default '{}'::jsonb,
  actor_id uuid references auth.users(id),
  actor_role public.app_role,
  created_at timestamptz not null default now(),
  constraint complaint_timeline_pkey primary key (id)
);

-- =====================================================================
-- 9. INDEXES
-- =====================================================================
create index idx_users_pincode on public.users (pincode);
create index idx_users_district on public.users (district);

create index idx_staff_role on public.staff (role);
create index idx_staff_supervisor_id on public.staff (supervisor_id);
create index idx_staff_location on public.staff using gist (location);
create index idx_staff_available_engineers on public.staff using gist (location)
  where role = 'engineer' and is_available = true and status = 'active';

create index idx_complaints_location on public.complaints using gist (location);
create index idx_complaints_status on public.complaints (status);
create index idx_complaints_priority on public.complaints (priority);
create index idx_complaints_assignment_status on public.complaints (assignment_status);
create index idx_complaints_assigned_engineer on public.complaints (assigned_engineer_id);
create index idx_complaints_assigned_supervisor on public.complaints (assigned_supervisor_id);
create index idx_complaints_uid on public.complaints (uid);
create index idx_complaints_created_at on public.complaints using brin (created_at);
create index idx_complaints_anonymous on public.complaints (is_anonymous) where is_anonymous = true;

create unique index idx_one_pending_assignment_per_complaint on public.complaint_assignments (complaint_id)
  where status = 'pending_supervisor_review';
create index idx_assignments_complaint_id on public.complaint_assignments (complaint_id);
create index idx_assignments_pending_deadline on public.complaint_assignments (supervisor_response_deadline)
  where status = 'pending_supervisor_review';

create index idx_media_complaint_id on public.complaint_media (complaint_id, media_type);
create index idx_comments_complaint_id on public.complaint_comments (complaint_id, created_at);
create index idx_timeline_complaint_id on public.complaint_timeline (complaint_id, created_at);
create index idx_timeline_event_type on public.complaint_timeline (event_type);

-- =====================================================================
-- 10. FUNCTIONS
-- =====================================================================

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.current_user_role()
returns public.app_role
language sql stable security definer as $$
  select coalesce(
    (select role::text::public.app_role from public.staff where id = auth.uid()),
    (select 'consumer'::public.app_role from public.users where id = auth.uid())
  );
$$;

create sequence if not exists public.complaint_ticket_seq;

create or replace function public.generate_ticket_number()
returns trigger language plpgsql as $$
begin
  new.ticket_number := 'CMP-' || to_char(now(), 'YYYY') || '-' ||
                       lpad(nextval('public.complaint_ticket_seq')::text, 6, '0');
  return new;
end;
$$;

create or replace function public.find_nearest_engineer(
  p_location geography,
  p_max_distance_meters integer default 50000
)
returns table (engineer_id uuid, supervisor_id uuid, distance_meters double precision)
language sql stable as $$
  select s.id, s.supervisor_id, st_distance(s.location, p_location)
  from public.staff s
  where s.role = 'engineer'
    and s.is_available = true
    and s.status = 'active'
    and s.location is not null
    and st_dwithin(s.location, p_location, p_max_distance_meters)
  order by s.location <-> p_location
  limit 1;
$$;

create or replace function public.assign_complaint(
  p_complaint_id uuid,
  p_sla_minutes integer default 120
)
returns void language plpgsql security definer as $$
declare
  v_complaint public.complaints%rowtype;
  v_match record;
  v_deadline timestamptz;
begin
  select * into v_complaint from public.complaints where id = p_complaint_id;

  if v_complaint.location is null then
    update public.complaints set assignment_status = 'unassigned' where id = p_complaint_id;
    return;
  end if;

  select * into v_match from public.find_nearest_engineer(v_complaint.location);

  if v_match.engineer_id is null then
    update public.complaints set assignment_status = 'unassigned' where id = p_complaint_id;
    return;
  end if;

  v_deadline := now() + (p_sla_minutes || ' minutes')::interval;

  insert into public.complaint_assignments
    (complaint_id, engineer_id, supervisor_id, status, supervisor_response_deadline, distance_meters)
  values
    (p_complaint_id, v_match.engineer_id, v_match.supervisor_id, 'pending_supervisor_review', v_deadline, v_match.distance_meters);

  update public.complaints
  set assigned_engineer_id = v_match.engineer_id,
      assigned_supervisor_id = v_match.supervisor_id,
      assignment_status = 'pending_supervisor_review',
      status = case when status = 'open' then 'pending_supervisor_review' else status end
  where id = p_complaint_id;

  insert into public.complaint_timeline (complaint_id, event_type, event_data)
  values (p_complaint_id, 'assigned_supervisor',
          jsonb_build_object('engineer_id', v_match.engineer_id, 'supervisor_id', v_match.supervisor_id, 'deadline', v_deadline));
end;
$$;

create or replace function public.process_assignment_timeouts()
returns void language plpgsql security definer as $$
declare r record;
begin
  for r in
    select * from public.complaint_assignments
    where status = 'pending_supervisor_review' and supervisor_response_deadline < now()
  loop
    update public.complaint_assignments set status = 'auto_assigned' where id = r.id;

    update public.complaints
    set assignment_status = 'auto_assigned', status = 'engineer_assigned'
    where id = r.complaint_id;

    insert into public.complaint_timeline (complaint_id, event_type, event_data)
    values (r.complaint_id, 'auto_assigned',
            jsonb_build_object('engineer_id', r.engineer_id, 'reason', 'supervisor_timeout'));
  end loop;
end;
$$;

create or replace function public.trg_auto_assign_complaint()
returns trigger language plpgsql as $$
begin
  perform public.assign_complaint(new.id);
  return new;
end;
$$;

create or replace function public.log_complaint_created()
returns trigger language plpgsql security definer as $$
begin
  insert into public.complaint_timeline (complaint_id, event_type, actor_id, actor_role, event_data)
  values (new.id, 'created', new.registered_by, new.registered_by_role,
          jsonb_build_object('is_anonymous', new.uid is null));
  return new;
end;
$$;

create or replace function public.log_complaint_status_change()
returns trigger language plpgsql security definer as $$
begin
  if new.status is distinct from old.status then
    insert into public.complaint_timeline (complaint_id, event_type, event_data)
    values (new.id, 'status_changed', jsonb_build_object('old_status', old.status, 'new_status', new.status));
  end if;
  return new;
end;
$$;

create or replace function public.log_comment_event()
returns trigger language plpgsql security definer as $$
begin
  insert into public.complaint_timeline (complaint_id, event_type, actor_id, actor_role, event_data)
  values (new.complaint_id, 'comment_added', new.author_id, new.author_role, jsonb_build_object('comment_id', new.id));
  return new;
end;
$$;

create or replace function public.log_media_event()
returns trigger language plpgsql security definer as $$
begin
  insert into public.complaint_timeline (complaint_id, event_type, actor_id, actor_role, event_data)
  values (new.complaint_id, 'media_added', new.uploaded_by, new.uploaded_by_role,
          jsonb_build_object('media_id', new.id, 'media_type', new.media_type));
  return new;
end;
$$;

create or replace function public.increment_engineer_load()
returns trigger language plpgsql security definer as $$
begin
  update public.staff set active_complaint_count = active_complaint_count + 1 where id = new.engineer_id;
  return new;
end;
$$;

create or replace function public.decrement_engineer_load()
returns trigger language plpgsql security definer as $$
begin
  if new.status in ('resolved','closed') and old.status not in ('resolved','closed')
     and new.assigned_engineer_id is not null then
    update public.staff
    set active_complaint_count = greatest(active_complaint_count - 1, 0)
    where id = new.assigned_engineer_id;
  end if;
  return new;
end;
$$;

-- =====================================================================
-- 11. TRIGGERS
-- =====================================================================
create trigger set_updated_at before update on public.users
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.staff
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.complaints
  for each row execute function public.set_updated_at();

create trigger before_complaint_insert_ticket before insert on public.complaints
  for each row execute function public.generate_ticket_number();

create trigger after_complaint_insert after insert on public.complaints
  for each row execute function public.trg_auto_assign_complaint();

create trigger after_complaint_insert_log after insert on public.complaints
  for each row execute function public.log_complaint_created();

create trigger after_complaint_status_change after update of status on public.complaints
  for each row execute function public.log_complaint_status_change();

create trigger after_complaint_status_update after update of status on public.complaints
  for each row execute function public.decrement_engineer_load();

create trigger after_assignment_insert after insert on public.complaint_assignments
  for each row execute function public.increment_engineer_load();

create trigger after_comment_insert after insert on public.complaint_comments
  for each row execute function public.log_comment_event();

create trigger after_media_insert after insert on public.complaint_media
  for each row execute function public.log_media_event();

-- =====================================================================
-- 12. ROW LEVEL SECURITY
-- =====================================================================
alter table public.users enable row level security;
create policy users_select_all on public.users for select using (true);
create policy users_insert_self on public.users for insert with check (auth.uid() = id);
create policy users_update_self on public.users for update using (auth.uid() = id);

alter table public.staff enable row level security;
create policy staff_select_all on public.staff for select using (true);
create policy staff_update_self on public.staff for update using (auth.uid() = id);

alter table public.complaints enable row level security;
create policy complaints_select_all on public.complaints for select using (true);
create policy complaints_insert on public.complaints for insert with check (
  uid is null or auth.uid() = uid or public.current_user_role() = 'agent'
);
create policy complaints_update on public.complaints for update using (
  auth.uid() = uid
  or auth.uid() = assigned_engineer_id
  or auth.uid() = assigned_supervisor_id
  or public.current_user_role() = 'agent'
);

alter table public.complaint_assignments enable row level security;
create policy assignments_select_all on public.complaint_assignments for select using (true);

alter table public.complaint_media enable row level security;
create policy media_select_all on public.complaint_media for select using (true);
create policy media_insert on public.complaint_media for insert with check (uploaded_by = auth.uid());

alter table public.complaint_comments enable row level security;
create policy comments_select on public.complaint_comments for select using (
  not is_internal or public.current_user_role() in ('agent','engineer','supervisor')
);
create policy comments_insert on public.complaint_comments for insert with check (author_id = auth.uid());

alter table public.complaint_timeline enable row level security;
create policy timeline_select_all on public.complaint_timeline for select using (true);

-- =====================================================================
-- 13. SCHEDULED JOB
-- =====================================================================
select cron.schedule(
  'process-assignment-timeouts',
  '* * * * *',
  $$select public.process_assignment_timeouts();$$
);