import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createAdminClient } from "../src/database/supabase/admin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

/**
 * Parse Markdown table from docs/data.md
 */
function parseDataMarkdown(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Data file not found at: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("|") && l.endsWith("|"));

  if (lines.length < 3) {
    throw new Error("No data rows found in markdown table.");
  }

  // Row 0 is header: | Meter Number | Phone Number | Mail |
  // Row 1 is separator: | ------------ | ------------ | ------------------- |
  // Row 2+ are data
  const dataRows = lines.slice(2);
  const users = [];

  for (const row of dataRows) {
    const cols = row
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);

    if (cols.length >= 3) {
      const [meterNumber, phoneNumber, email] = cols;
      users.push({
        meterNumber,
        phoneNumber,
        email,
        password: meterNumber, // Meter Number used as password
      });
    }
  }

  return users;
}

/**
 * Delete all existing users from Supabase Auth
 */
async function deleteAllExistingUsers(supabase) {
  console.log("🧹 Step 1: Deleting existing users from Supabase Auth...");
  let deletedCount = 0;

  while (true) {
    const { data: listData, error: listError } =
      await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 50,
      });

    if (listError) {
      console.error(
        `❌ Failed to list users for cleanup: ${listError.message}`
      );
      break;
    }

    const usersToDelete = listData?.users || [];
    if (usersToDelete.length === 0) {
      break;
    }

    for (const existingUser of usersToDelete) {
      process.stdout.write(
        `   Deleting user ${existingUser.email} (${existingUser.id})... `
      );
      const { error: delErr } = await supabase.auth.admin.deleteUser(
        existingUser.id
      );

      if (delErr) {
        console.log(`❌ Failed: ${delErr.message}`);
      } else {
        console.log("🗑️ Deleted");
        deletedCount++;
      }
    }
  }

  console.log(`✅ Cleared ${deletedCount} existing user(s) from Supabase.\n`);
}

async function seedUsers() {
  console.log("==================================================");
  console.log("⚡ SUPABASE USER RESET & PROVISIONING SCRIPT");
  console.log("==================================================\n");

  const dataPath = path.resolve(rootDir, "docs", "data.md");
  console.log(`📖 Reading user data from: ${dataPath}`);

  const users = parseDataMarkdown(dataPath);
  console.log(`👥 Found ${users.length} users to provision.`);
  console.log("🔑 Password format: Meter Number");
  console.log("📧 Email format: Mail address with auto-verification\n");

  const supabase = createAdminClient();

  // Step 1: Delete all existing users
  await deleteAllExistingUsers(supabase);

  // Step 2: Create users afresh
  console.log("🚀 Step 2: Creating users on Supabase Auth...");
  const results = [];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    process.stdout.write(
      `[${i + 1}/${users.length}] Creating ${user.email} (Password: ${user.password})... `
    );

    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true, // Automatically verifies the email
        user_metadata: {
          meter_number: user.meterNumber,
          phone_number: user.phoneNumber,
          phone: user.phoneNumber,
        },
      });

      if (error) {
        console.log(`❌ Error: ${error.message}`);
        results.push({
          ...user,
          userId: "N/A",
          status: `Failed (${error.message})`,
        });
      } else {
        console.log(`✅ Created & Auto-Verified (${data.user?.id})`);
        results.push({
          ...user,
          userId: data.user?.id,
          status: "Created & Verified",
        });
      }
    } catch (err) {
      console.log(`❌ Exception: ${err.message}`);
      results.push({
        ...user,
        userId: "N/A",
        status: `Error (${err.message})`,
      });
    }
  }

  console.log("\n==================================================");
  console.log("📊 SUMMARY REPORT");
  console.log("==================================================");
  console.table(
    results.map((r) => ({
      "Meter Number": r.meterNumber,
      "Phone Number": r.phoneNumber,
      Email: r.email,
      Password: r.password,
      "User ID": r.userId,
      Status: r.status,
    }))
  );
  console.log("\n✨ All operations finished successfully.\n");
}

seedUsers().catch((err) => {
  console.error("\n❌ Fatal execution error:", err);
  process.exit(1);
});
