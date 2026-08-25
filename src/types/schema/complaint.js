import { z } from "zod";

// ─────────────────────────────────────────────────────────────
// Regex patterns for permitted social media platforms
// ─────────────────────────────────────────────────────────────
export const YOUTUBE_REGEX =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/|v\/)|youtu\.be\/)[a-zA-Z0-9_-]{6,}(\S*)?$/i;

export const INSTAGRAM_REGEX =
  /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv|share|[\w.]+)\/[a-zA-Z0-9_\-\.]+(\S*)?$/i;

export const X_TWITTER_REGEX =
  /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+(\/status\/[0-9]+)?(\S*)?$/i;

/**
 * Detects whether a URL belongs to YouTube, Instagram, or X (Twitter).
 * Returns 'youtube' | 'instagram' | 'x' | null.
 */
export function detectSocialPlatform(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (YOUTUBE_REGEX.test(trimmed)) return "youtube";
  if (INSTAGRAM_REGEX.test(trimmed)) return "instagram";
  if (X_TWITTER_REGEX.test(trimmed)) return "x";
  return null;
}

// ─────────────────────────────────────────────────────────────
// Location sub-schema (Step 2)
// At least one of GPS (lat+lng) or typed address is required.
// Landmark is always optional.
// ─────────────────────────────────────────────────────────────
export const locationSchema = z
  .object({
    latitude: z.number().optional().nullable(),
    longitude: z.number().optional().nullable(),
    address: z
      .string()
      .max(500, "Address must be under 500 characters.")
      .optional()
      .nullable(),
    landmark: z
      .string()
      .max(200, "Landmark must be under 200 characters.")
      .optional()
      .nullable(),
  })
  .refine(
    (d) =>
      (d.latitude != null && d.longitude != null) ||
      (typeof d.address === "string" && d.address.trim().length >= 5),
    {
      message:
        "Provide either a GPS location or a typed address (min. 5 characters).",
      path: ["address"],
    }
  );

// ─────────────────────────────────────────────────────────────
// Media item schema (stored in public.complaints.url JSONB)
// ─────────────────────────────────────────────────────────────
export const mediaItemSchema = z.object({
  type: z.enum(["image", "pdf", "youtube", "instagram", "x"]),
  url: z.string().min(1, "URL is required."),
  name: z.string().optional(),
  originalSize: z.string().optional(),
  compressedSize: z.string().optional(),
  size: z.string().optional(),
});

// ─────────────────────────────────────────────────────────────
// File metadata schema for pre-signed upload requests
// ─────────────────────────────────────────────────────────────
export const fileMetaSchema = z.object({
  type: z.enum(["image", "pdf"]),
  size: z.string().optional(),
});

// ─────────────────────────────────────────────────────────────
// Full complaint submission schema (used by server action)
// ─────────────────────────────────────────────────────────────
export const complaintSchema = z.object({
  issue: z.string().min(1, "Issue is required.").max(200, "Issue is too long."),

  description: z
    .string()
    .max(1000, "Description must be under 1000 characters.")
    .optional()
    .nullable(),

  address: z.string().max(500, "Address is too long.").optional().nullable(),

  landmark: z.string().max(200, "Landmark is too long.").optional().nullable(),

  longitude: z.number().optional().nullable(),

  latitude: z.number().optional().nullable(),

  location: z.string().max(500, "Location is too long.").optional().nullable(),

  url: z
    .array(mediaItemSchema)
    .max(10, "Maximum 10 proofs allowed.")
    .default([]),

  files: z.array(fileMetaSchema).optional().default([]),
});
