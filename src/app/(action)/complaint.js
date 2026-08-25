"use server";

import { complaintSchema } from "@/types/schema/complaint";
import { ISSUES } from "@/constants/issues";
import { createClient } from "@/database/supabase/server";
import { createAdminClient } from "@/database/supabase/admin";

// ── Derive priority from issue title ────────────────────────────────────────
// Looks up the canonical priority from shared ISSUES data so the client
// never has to send it (and can't spoof it).
function derivePriority(issueTitle) {
  const match = ISSUES.find(
    (i) => i.title.toLowerCase() === issueTitle?.toLowerCase()
  );
  return match?.priority ?? "normal";
}

// ── Build a human-readable location string from lat/lng or address ─────────
function buildLocationString({ latitude, longitude, address }) {
  if (latitude != null && longitude != null) {
    const base = `${Number(latitude).toFixed(4)}° N, ${Number(longitude).toFixed(4)}° E`;
    return address ? `${base} — ${address}` : base;
  }
  return address ?? null;
}

// ============================================================
// CREATE COMPLAINT
// Accepts a plain JS object (from React Hook Form).
// priority and location are derived server-side.
// ============================================================

export async function createComplaint(payload) {
  // ── Validate first (no I/O) ───────────────────────────────
  const validation = complaintSchema.safeParse(payload);

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message ?? "Validation failed.",
      fieldErrors: validation.error.flatten().fieldErrors,
    };
  }

  const data = validation.data;

  // ── Auth (JWT claims — no network round-trip) ─────────────
  const supabase = await createClient();
  const supabaseAdmin = await createAdminClient();


  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to file a complaint.",
    };
  }

  // ── Derive server-side fields ─────────────────────────────
  const priority = derivePriority(data.issue);
  const location = buildLocationString({
    latitude: data.latitude,
    longitude: data.longitude,
    address: data.address,
  });

  // ── Insert ────────────────────────────────────────────────
  const { data: complaint, error: insertError } = await supabaseAdmin
    .from("complaints")
    .insert({
      uid: user.id,
      issue: data.issue,
      description: data.description ?? null,
      address: data.address ?? null,
      landmark: data.landmark ?? null,
      longitude: data.longitude ?? null,
      latitude: data.latitude ?? null,
      location,
      priority,
    })
    .select()
    .single();

  if (insertError) {
    console.error("❌ COMPLAINT INSERT FAILED", insertError);
    return { success: false, error: "Could not submit your complaint. Please try again." };
  }


  return {
    success: true,
    complaint: {
      id: complaint.id,
      issue: complaint.issue,
      status: complaint.status,
      priority: complaint.priority,
      created_at: complaint.created_at,
    },
    message: "Complaint submitted successfully.",
  };
}