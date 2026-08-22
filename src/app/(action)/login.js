"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/database/supabase/server";
import { loginSchema } from "@/app/types/schema";

export default async function login(data) {
  const checkFields = loginSchema.safeParse(data);

  if (!checkFields.success) {
    return {
      success: false,
      errors: checkFields.error.flatten().fieldErrors,
      message: "Please provide a valid Meter Number and Phone Number.",
    };
  }

  const { meterNumber, phoneNumber } = checkFields.data;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Ponytail: Map phone number to email and meter number to password for Supabase Auth
  const email = `${phoneNumber}@mail.com`;
  const password = meterNumber;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: "Invalid Meter Number or Phone Number.",
    };
  }

  redirect("/");
}
