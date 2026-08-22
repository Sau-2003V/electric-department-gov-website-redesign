import { createAdminClient } from "../src/database/supabase/admin.js";

const meterData = [
  { name: "Aarav Sharma", meterNumber: "000100001", phoneNumber: "9000000001" },
  { name: "Priya Patel", meterNumber: "000100002", phoneNumber: "9000000002" },
  { name: "Rohan Verma", meterNumber: "000100003", phoneNumber: "9000000003" },
  { name: "Ananya Iyer", meterNumber: "000100004", phoneNumber: "9000000004" },
  { name: "Vikram Reddy", meterNumber: "000100005", phoneNumber: "9000000005" },
  { name: "Kavya Nair", meterNumber: "000100006", phoneNumber: "9000000006" },
  { name: "Aditya Gupta", meterNumber: "000100007", phoneNumber: "9000000007" },
  { name: "Neha Singh", meterNumber: "000100008", phoneNumber: "9000000008" },
  {
    name: "Siddharth Joshi",
    meterNumber: "000100009",
    phoneNumber: "9000000009",
  },
  {
    name: "Diya Chatterjee",
    meterNumber: "000100010",
    phoneNumber: "9000000010",
  },
];

async function seedUsers() {
  const supabase = createAdminClient();

  console.log("🧹 Cleaning up existing users...");
  const { data: listData, error: listError } =
    await supabase.auth.admin.listUsers({ perPage: 100 });
  if (!listError && listData?.users) {
    for (const user of listData.users) {
      await supabase.auth.admin.deleteUser(user.id);
    }
  }

  console.log(`🚀 Adding ${meterData.length} users to Supabase Auth DB...`);
  const results = [];

  for (const user of meterData) {
    const email = `${user.phoneNumber}@mail.com`;
    const password = user.meterNumber;

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: {
        name: user.name,
        meter_number: user.meterNumber,
      },
      user_metadata: {
        name: user.name,
        meter_number: user.meterNumber,
        phone_number: user.phoneNumber,
      },
    });

    results.push({
      Name: user.name,
      "Meter Number": user.meterNumber,
      "Phone Number": user.phoneNumber,
      Email: email,
      "User ID": data?.user?.id || "N/A",
      Status: error ? `Error: ${error.message}` : "Created & Verified",
    });
  }

  console.table(results);
}

seedUsers().catch(console.error);
