import { updateSession } from "./database/supabase/middleware";

export async function proxy(request) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/dashboard",
    "/complaints",
    "/complaints/new",
    "/help",
    "/notices",
    "/settings",
    "/staff/dashboard",
    "/staff/complaints",
    "/staff/engineers",
    "/staff/notices",
    "/staff/settings",
  ],
};
