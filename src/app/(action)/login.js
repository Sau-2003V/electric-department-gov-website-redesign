"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/database/supabase/server";
import { staffLoginSchema, loginSchema } from "@/types/schema/login";

// ─── Login Action ────────────────────────────────────────────────────────────

/**
 * Unified login server action.
 *
 * @param {Object} data
 * @param {"staff" | "consumer"} data.loginType - Determines which flow to run.
 * @param {string}  [data.phoneNumber]           - Required for both flows.
 * @param {string}  [data.meterNumber]           - Required for consumer flow only.
 */
export default async function login(data) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  // URL se pata karo — /staff/login se aaya hai ya /login se
  const headersList = await headers();
  const referer = headersList.get("referer") ?? "";
  const isStaff = referer.includes("/staff/login");

  // ── Staff Login (/staff/login) ─────────────────────────────────────────────
  if (isStaff) {
    const parsed = staffLoginSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
        message: "Please provide a valid 10-digit phone number.",
      };
    }

    const { phoneNumber } = parsed.data;

    // email = phone@mail.com  |  password = phoneNumber
    const { error } = await supabase.auth.signInWithPassword({
      email: `${phoneNumber}@mail.com`,
      password: phoneNumber,
    });

    if (error) {
      return {
        success: false,
        message: "Invalid phone number. Please try again.",
      };
    }

    redirect("/staff/dashboard");
  }

  // ── Consumer Login (/login) ────────────────────────────────────────────────
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Please provide a valid Meter Number and Phone Number.",
    };
  }

  const { meterNumber, phoneNumber } = parsed.data;

  // email = phone@mail.com  |  password = meterNumber
  const { error } = await supabase.auth.signInWithPassword({
    email: `${phoneNumber}@mail.com`,
    password: meterNumber,
  });

  if (error) {
    return {
      success: false,
      message: "Invalid Meter Number or Phone Number. Please try again.",
    };
  }

  redirect("/dashboard");
}
