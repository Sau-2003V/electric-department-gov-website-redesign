import { updateSession } from "@/database/supabase/middleware";
import { type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/dashboard",
    "/complaints",
    "/complaints/new",
    "/help",
    "/notices",
  ],
};
