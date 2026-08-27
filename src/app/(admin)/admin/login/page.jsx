export const metadata = {
  title: "Admin Login · Vidhyut Portal",
  description:
    "Administrative access portal for electricity department officials and system administrators.",
};

export default function AdminLogin() {
  return (
    <div>
      <h1>Admin Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
