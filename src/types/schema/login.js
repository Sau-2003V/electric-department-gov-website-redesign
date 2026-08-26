import { z } from "zod";

/** /staff/login — only phone number required */
export const staffLoginSchema = z.object({
  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

/** /login — meter number + phone number required */
export const loginSchema = z.object({
  meterNumber: z
    .string()
    .min(5, "Meter number must be at least 5 digits")
    .regex(/^\d+$/, "Meter number must contain only digits"),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});
