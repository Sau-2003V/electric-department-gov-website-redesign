import { z } from "zod";

// ─────────────────────────────────────────────────────────────
// Location sub-schema (step 2)
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
});
