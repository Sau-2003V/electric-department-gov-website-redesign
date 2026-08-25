"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

// ============================================================
// PART 1: VALIDATION
// ============================================================

const complaintSchema = z.object({
  issue: z
    .string()
    .min(1, "Issue is required.")
    .max(200, "Issue is too long."),

  description: z
    .string()
    .max(1000, "Description must be under 1000 characters.")
    .optional()
    .nullable(),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters.")
    .optional()
    .nullable(),

  landmark: z
    .string()
    .max(200, "Landmark is too long.")
    .optional()
    .nullable(),

  longitude: z.number().optional().nullable(),

  latitude: z.number().optional().nullable(),

  location: z
    .string()
    .max(500, "Location is too long.")
    .optional()
    .nullable(),

  priority: z
    .enum(["low", "normal", "high", "critical"])
    .default("normal"),
});


// ============================================================
// PART 2: CREATE COMPLAINT
// ============================================================

export async function createComplaint(prevState, formData) {
  console.log("========================================");
  console.log("🚀 CREATE COMPLAINT STARTED");
  console.log("========================================");

  try {
    // ========================================================
    // PART 3: SUPABASE CLIENT
    // ========================================================

    const supabase = await createClient();

    console.log("✅ Supabase client created");

    console.log(
      "🔗 Supabase URL:",
      process.env.NEXT_PUBLIC_SUPABASE_URL
    );

    console.log(
      "🔑 Supabase Publishable Key exists:",
      !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    );


    // ========================================================
    // PART 4: AUTH CHECK
    // ========================================================

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    console.log("👤 AUTH USER:", user);
    console.log("❌ AUTH ERROR:", authError);

    if (authError) {
      console.error("❌ Authentication error:", authError);

      return {
        success: false,
        error: "Authentication failed.",
      };
    }

    if (!user) {
      console.error("❌ No logged-in user found.");

      return {
        success: false,
        error: "You must be logged in to file a complaint.",
      };
    }

    console.log("✅ Logged-in user ID:", user.id);


    // ========================================================
    // PART 5: GET FORM DATA
    // ========================================================

    const rawData = {
      issue: formData.get("issue"),

      description: formData.get("description") || null,

      address: formData.get("address") || null,

      landmark: formData.get("landmark") || null,

      longitude:
        formData.get("longitude") !== null &&
        formData.get("longitude") !== ""
          ? Number(formData.get("longitude"))
          : null,

      latitude:
        formData.get("latitude") !== null &&
        formData.get("latitude") !== ""
          ? Number(formData.get("latitude"))
          : null,

      location: formData.get("location") || null,

      priority: formData.get("priority") || "normal",
    };


    console.log("📦 RAW FORM DATA:");
    console.log(rawData);


    // ========================================================
    // PART 6: VALIDATION
    // ========================================================

    const validation = complaintSchema.safeParse(rawData);

    if (!validation.success) {
      console.error("❌ VALIDATION FAILED");

      console.error(
        "Validation errors:",
        validation.error.flatten()
      );

      return {
        success: false,
        error:
          validation.error.issues[0]?.message ||
          "Validation failed.",
        fieldErrors: validation.error.flatten().fieldErrors,
      };
    }

    const data = validation.data;

    console.log("✅ VALIDATION PASSED");
    console.log("Validated data:", data);


    // ========================================================
    // PART 7: CHECK USER EXISTS IN `users` TABLE
    // ========================================================
    // IMPORTANT:
    // complaints.uid -> users.id foreign key hai.
    //
    // Isliye auth.users ka ID `public.users.id` mein hona
    // zaroori hai.

    console.log("🔍 Checking user in public.users...");

    const {
      data: dbUser,
      error: dbUserError,
    } = await supabase
      .from("users")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    console.log("👤 public.users result:", dbUser);
    console.log("❌ public.users error:", dbUserError);

    if (dbUserError) {
      console.error(
        "❌ Failed to check public.users:",
        dbUserError
      );

      return {
        success: false,
        error: "Could not verify your user account.",
      };
    }

    if (!dbUser) {
      console.error(
        "❌ Auth user exists but public.users row does not exist."
      );

      console.error(
        "Auth UID:",
        user.id
      );

      return {
        success: false,
        error:
          "Your user profile does not exist in the users table.",
      };
    }

    console.log("✅ User exists in public.users");


    // ========================================================
    // PART 8: INSERT COMPLAINT
    // ========================================================

    const complaintPayload = {
      uid: user.id,
      issue: data.issue,
      description: data.description,
      address: data.address,
      landmark: data.landmark,
      longitude: data.longitude,
      latitude: data.latitude,
      location: data.location,
      priority: data.priority,

      // status ka default DB handle karega:
      // registered
    };

    console.log("========================================");
    console.log("📤 INSERTING COMPLAINT");
    console.log("========================================");

    console.log("Complaint payload:");
    console.log(complaintPayload);


    const {
      data: complaint,
      error: insertError,
    } = await supabase
      .from("complaints")
      .insert(complaintPayload)
      .select()
      .single();


    // ========================================================
    // PART 9: INSERT RESULT
    // ========================================================

    console.log("========================================");
    console.log("📥 INSERT RESULT");
    console.log("========================================");

    console.log("Inserted complaint:", complaint);
    console.log("Insert error:", insertError);


    if (insertError) {
      console.error("❌ COMPLAINT INSERT FAILED");
      console.error("Error message:", insertError.message);
      console.error("Error details:", insertError.details);
      console.error("Error hint:", insertError.hint);
      console.error("Error code:", insertError.code);

      return {
        success: false,
        error: insertError.message,
      };
    }


    // ========================================================
    // PART 10: SUCCESS
    // ========================================================

    console.log("========================================");
    console.log("🎉 COMPLAINT CREATED SUCCESSFULLY");
    console.log("========================================");

    console.log("Complaint ID:", complaint.id);
    console.log("User ID:", complaint.uid);
    console.log("Issue:", complaint.issue);
    console.log("Priority:", complaint.priority);
    console.log("Status:", complaint.status);
    console.log("Created At:", complaint.created_at);

    console.log("========================================");


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

  } catch (error) {
    // ========================================================
    // PART 11: UNEXPECTED ERROR
    // ========================================================

    console.error("========================================");
    console.error("💥 UNEXPECTED ERROR");
    console.error("========================================");

    console.error(error);
    console.error("Message:", error?.message);
    console.error("Stack:", error?.stack);

    return {
      success: false,
      error:
        error?.message ||
        "Something went wrong while creating complaint.",
    };
  }
}