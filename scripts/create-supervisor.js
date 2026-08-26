import { createAdminClient } from "../src/database/supabase/admin.js";

const userData = [
  { name: "Rahul Mehta", phoneNumber: "9111000021" },
  { name: "Simran Kaur", phoneNumber: "9111000022" },
  { name: "Arjun Desai", phoneNumber: "9111000023" },
  { name: "Meera Pillai", phoneNumber: "9111000024" },
  { name: "Karan Malhotra", phoneNumber: "9111000025" },
  { name: "Ishita Bose", phoneNumber: "9111000026" },
  { name: "Nikhil Rao", phoneNumber: "9111000027" },
  { name: "Tanya Kapoor", phoneNumber: "9111000028" },
  { name: "Yash Agarwal", phoneNumber: "9111000029" },
  { name: "Ritika Menon", phoneNumber: "9111000030" },
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
        role: "supervisor",
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
