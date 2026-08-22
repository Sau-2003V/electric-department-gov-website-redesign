import { z } from "zod";

export const loginSchema = z.object({
  meterNumber: z
    .string()
    .min(1, "Meter number is required.")
    .regex(/^\d+$/, "Meter number must contain only digits."),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required.")
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),
});
