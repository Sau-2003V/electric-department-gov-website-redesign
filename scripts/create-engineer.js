import { createAdminClient } from "../src/database/supabase/admin.js";

const userData = [
  { name: "Aman Trivedi", phoneNumber: "9222000041" },
  { name: "Harsh Vora", phoneNumber: "9222000042" },
  { name: "Dev Chauhan", phoneNumber: "9222000043" },
  { name: "Rohit Kulkarni", phoneNumber: "9222000044" },
  { name: "Manish Bhatia", phoneNumber: "9222000045" },
  { name: "Sameer Khanna", phoneNumber: "9222000046" },
  { name: "Vivek Rastogi", phoneNumber: "9222000047" },
  { name: "Abhishek Nanda", phoneNumber: "9222000048" },
  { name: "Gaurav Sinha", phoneNumber: "9222000049" },
  { name: "Kunal Bakshi", phoneNumber: "9222000050" },
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
        role: "engineer",
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
