import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "@/database/supabase/supabase";

export const complaintKeys = {
  all: ["complaints"],
  list: (params) => [...complaintKeys.all, "list", params ?? {}],
  byUser: (uid, params) => [...complaintKeys.all, "user", uid, params ?? {}],
  detail: (id) => [...complaintKeys.all, "detail", id],
};

/**
 * Fetches complaints from public.complaints table.
 * If uid is provided, filters by user; otherwise fetches complaints ordered by created_at desc.
 * Supports limit parameter (e.g., limit: 4 for recent complaints).
 * @param {string|{ uid?: string, limit?: number }} [params] - Optional user UUID or options object
 * @param {number} [limitParam] - Optional limit if first arg is uid
 * @returns {Promise<object[]>}
 */
export async function getComplaints(params, limitParam) {
  let uid = null;
  let limit = null;

  if (typeof params === "string") {
    uid = params;
    limit = limitParam ?? null;
  } else if (params && typeof params === "object") {
    uid = params.uid ?? null;
    limit = params.limit ?? limitParam ?? null;
  }

  let query = supabase
    .from("complaints")
    .select("*")
    .order("created_at", { ascending: false });

  if (uid) {
    query = query.eq("uid", uid);
  }

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

/**
 * Fetches a single complaint by ID from public.complaints.
 * Falls back to mock complaints if not found or if mock ID format is used.
 * @param {string} id - Complaint UUID or mock identifier
 * @returns {Promise<object|null>}
 */
export async function getComplaintById(id) {
  if (!id) return null;

  try {
    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      return data;
    }
  } catch (err) {
    console.warn("Could not query DB by ID directly:", err?.message || err);
  }

  return null;
}

export const getComplaintsQueryOptions = (params, options = {}) => {
  const uid = typeof params === "string" ? params : params?.uid;
  const key = uid
    ? complaintKeys.byUser(uid, typeof params === "object" ? params : {})
    : complaintKeys.list(typeof params === "object" ? params : {});

  return queryOptions({
    queryKey: key,
    queryFn: () => getComplaints(params),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export function useGetComplaints(params, options = {}) {
  return useQuery(getComplaintsQueryOptions(params, options));
}

export function useGetRecentComplaints(limit = 4, options = {}) {
  return useQuery(getComplaintsQueryOptions({ limit }, options));
}

export const getComplaintByIdQueryOptions = (id, options = {}) =>
  queryOptions({
    queryKey: complaintKeys.detail(id),
    queryFn: () => getComplaintById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    ...options,
  });

export function useGetComplaint(id, options = {}) {
  return useQuery(getComplaintByIdQueryOptions(id, options));
}
