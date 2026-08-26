import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// ponytail: role sets — ceiling is single role per user; upgrade to array roles when needed
const CONSUMER = new Set(["consumer"]);
const STAFF = new Set(["agent", "supervisor", "engineer"]);

const RULES = [
  [/^\/(dashboard|complaints|help|notices|settings)(\/|$)/, CONSUMER],
  [/^\/staff\//, STAFF],
];

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: Do not write code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake can write a request with
  // the old session cookie.
  const { data } = await supabase.auth.getClaims();
  const role = data?.claims?.app_metadata?.role;
  const path = request.nextUrl.pathname;

  const rule = RULES.find(([pattern]) => pattern.test(path));

  if (rule) {
    if (!role) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", path);
      return NextResponse.redirect(url);
    }
    if (!rule[1].has(role)) {
      // ponytail: redirects to role home; upgrade to a proper 403 page if needed
      const url = request.nextUrl.clone();
      url.pathname = STAFF.has(role) ? "/staff/dashboard" : "/dashboard";
      url.searchParams.delete("next");
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const createClient = updateSession;
