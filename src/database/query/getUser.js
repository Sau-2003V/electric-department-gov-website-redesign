import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/database/supabase/supabase";

/**
 * Query keys for user-related queries.
 * Structured hierarchically for targeted cache invalidation.
 */
export const userKeys = {
  all: ["user"],
  current: () => [...userKeys.all, "current"],
  detail: (id) => [...userKeys.all, "detail", id],
};

/**
 * Fetches the authenticated user from Supabase Auth.
 * Returns the user object if authenticated, or null if no active session.
 *
 * @returns {Promise<import("@supabase/supabase-js").User | null>}
 */
export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    // If no active session or unauthenticated, return null gracefully
    if (
      error.name === "AuthSessionMissingError" ||
      error.message?.toLowerCase().includes("session") ||
      error.message?.toLowerCase().includes("auth") ||
      error.status === 400 ||
      error.status === 401
    ) {
      return null;
    }
    throw error;
  }

  return user ?? null;
}

/**
 * Query options for fetching the authenticated user.
 * Configured with efficient caching defaults (5 min staleTime, 30 min gcTime).
 *
 * @param {import("@tanstack/react-query").UseQueryOptions} [options]
 * @returns {import("@tanstack/react-query").UseQueryOptions}
 */
export const getUserQueryOptions = (options = {}) =>
  queryOptions({
    queryKey: userKeys.current(),
    queryFn: getUser,
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes (prevents duplicate fetches)
    gcTime: 1000 * 60 * 30, // Inactive data cached in memory for 30 minutes
    refetchOnWindowFocus: false, // Prevents aggressive refetching on window refocus
    retry: (failureCount, error) => {
      // Avoid retrying on unauthenticated or unauthorized errors
      if (error?.status === 401 || error?.status === 403) return false;
      return failureCount < 2;
    },
    ...options,
  });

/**
 * React Query hook to get the current authenticated user.
 * Exports useQuery hook with optimal caching.
 *
 * @param {import("@tanstack/react-query").UseQueryOptions} [options]
 * @returns {import("@tanstack/react-query").UseQueryResult}
 */
export function useGetUser(options = {}) {
  return useQuery(getUserQueryOptions(options));
}

/**
 * Alias for useGetUser
 */
export const useUser = useGetUser;

/**
 * Custom hook to invalidate the cached user data.
 * Useful after login, logout, or profile update.
 *
 * @returns {() => Promise<void>}
 */
export function useInvalidateUser() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: userKeys.all });
}
