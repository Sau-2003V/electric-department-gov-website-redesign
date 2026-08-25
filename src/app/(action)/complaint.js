"use server";

import {
  complaintSchema,
  detectSocialPlatform,
} from "@/types/schema/complaint";
import { ISSUES } from "@/constants/issues";
import { createClient } from "@/database/supabase/server";
import { createAdminClient } from "@/database/supabase/admin";

// ── Derive priority from issue title ────────────────────────────────────────
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
// 1. Authenticate user & validate schema.
// 2. Insert complaint record into DB.
// 3. Generate signed upload URLs for attached files.
// 4. Return complaint ID and upload URLs to client.
// ============================================================
export async function createComplaint(payload) {
  const validation = complaintSchema.safeParse(payload);

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message ?? "Validation failed.",
      fieldErrors: validation.error.flatten().fieldErrors,
    };
  }

  const data = validation.data;

  // ── Auth check ────────────────────────────────────────────
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to file a complaint.",
    };
  }

  // ── Process social media links ─────────────────────────────
  const socialUrls = [];
  for (const item of data.url || []) {
    const platform = detectSocialPlatform(item.url);
    if (platform) {
      socialUrls.push({
        type: platform,
        url: item.url.trim(),
      });
    }
  }

  // ── Insert complaint into DB ──────────────────────────────
  const priority = derivePriority(data.issue);
  const location = buildLocationString({
    latitude: data.latitude,
    longitude: data.longitude,
    address: data.address,
  });

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
      status: "registered",
      url: socialUrls,
    })
    .select("id")
    .single();

  if (insertError) {
    console.error("❌ COMPLAINT INSERT FAILED", insertError);
    return {
      success: false,
      error: "Could not submit your complaint. Please try again.",
    };
  }

  // ── Process file upload URLs if files are attached ─────────
  let uploadUrls = [];

  if (data.files && data.files.length > 0) {
    // ponytail: create signed upload URLs in storage bucket 'complaints'
    uploadUrls = await Promise.all(
      data.files.map(async (file, idx) => {
        const ext = file.type === "pdf" ? "pdf" : "webp";
        const filePath = `${complaint.id}/${Date.now()}_${idx}.${ext}`;

        const { data: signedData, error: signError } =
          await supabaseAdmin.storage
            .from("complaint-evidence")
            .createSignedUploadUrl(filePath);

        if (signError) {
          console.warn("Signed upload URL error:", signError.message);
        }

        return {
          type: file.type,
          path: filePath,
          signedUrl: signedData?.signedUrl || null,
          token: signedData?.token || null,
        };
      })
    );
  }

  return {
    success: true,
    complaintId: complaint.id,
    uploadUrls,
  };
}
