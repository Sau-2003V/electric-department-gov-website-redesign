import { createAdminClient } from "../src/database/supabase/admin.js";

const userData = [
  { name: "Farhan Ali Khan", phoneNumber: "9333000061" },
  { name: "Ritu Chawla", phoneNumber: "9333000062" },
  { name: "Suresh Yadav", phoneNumber: "9333000063" },
  { name: "Payal Deshmukh", phoneNumber: "9333000064" },
  { name: "Naveen Balan", phoneNumber: "9333000065" },
  { name: "Divya Krishnan", phoneNumber: "9333000066" },
  { name: "Ashok Bhardwaj", phoneNumber: "9333000067" },
  { name: "Shreya Kulkarni", phoneNumber: "9333000068" },
  { name: "Imran Sheikh", phoneNumber: "9333000069" },
  { name: "Lavanya Subramaniam", phoneNumber: "9333000070" },
];

async function seedUsers() {
  const supabase = createAdminClient();

  console.log(`🚀 Adding ${userData.length} users to Supabase Auth DB...`);
  const results = [];

  for (const user of userData) {
    const email = `${user.phoneNumber}@mail.com`;
    const password = user.phoneNumber;

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: {
        role: "agent",
        phone: user.phoneNumber,
      },
      user_metadata: {
        name: user.name,
      },
    });

    results.push({
      Name: user.name,
      "Phone Number": user.phoneNumber,
      Email: email,
      Password: password,
      "User ID": data?.user?.id || "N/A",
      Status: error ? `Error: ${error.message}` : "Created & Verified",
    });
  }

  console.table(results);
}

seedUsers().catch(console.error);
