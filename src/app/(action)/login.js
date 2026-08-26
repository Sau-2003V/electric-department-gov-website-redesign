"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/database/supabase/server";
import { z } from "zod";

// Staff/simple login schema (sirf phone number)
const phoneOnlySchema = z.object({
  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  next: z.string().optional(),
});

// Consumer login schema (meter + phone)
export const loginSchema = z.object({
  meterNumber: z
    .string()
    .min(5, "Meter number must be at least 5 digits")
    .regex(/^\d+$/, "Meter number must contain only digits"),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  next: z.string().optional(),
});

export default async function login(data) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  // ⚡ Case 1: Sirf phone number diya gaya (staff/simple login)
  if (data?.meterNumber === undefined || data?.meterNumber === "") {
    const checkFields = phoneOnlySchema.safeParse(data);

    if (!checkFields.success) {
      return {
        success: false,
        errors: checkFields.error.flatten().fieldErrors,
        message: "Please provide a valid 10-digit phone number.",
      };
    }

    const { phoneNumber } = checkFields.data;

    // Email/password mapping for staff/simple login
    const email = `${phoneNumber}@staff.com`;
    const password = phoneNumber;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { success: false, message: "Invalid phone number." };
    }

    // ✅ Redirect to home page
    redirect("/");
  }

  // ⚡ Case 2: Consumer login (meter + phone)
  const checkFields = loginSchema.safeParse(data);

  if (!checkFields.success) {
    return {
      success: false,
      errors: checkFields.error.flatten().fieldErrors,
      message: "Please provide valid numeric Meter Number and Phone Number.",
    };
  }

  const { meterNumber, phoneNumber } = checkFields.data;

  const email = `${phoneNumber}@mail.com`;
  const password = meterNumber;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      success: false,
      message: "Invalid Meter Number or Phone Number.",
    };
  }

  // ✅ Redirect to dashboard for consumer
  redirect(data?.next || "/dashboard");
}
