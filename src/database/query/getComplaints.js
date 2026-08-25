import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "@/database/supabase/supabase";

export const complaintKeys = {
  all: ["complaints"],
  list: () => [...complaintKeys.all, "list"],
  byUser: (uid) => [...complaintKeys.all, "user", uid],
};

/**
 * Fetches complaints from public.complaints table.
 * If uid is provided, filters by user; otherwise fetches all complaints.
 * @param {string} [uid] - Optional user UUID to filter by
 * @returns {Promise<object[]>}
 */
export async function getComplaints(uid) {
  let query = supabase
    .from("complaints")
    .select("*")
    .order("created_at", { ascending: false });

  if (uid) {
    query = query.eq("uid", uid);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export const getComplaintsQueryOptions = (uid, options = {}) =>
  queryOptions({
    queryKey: uid ? complaintKeys.byUser(uid) : complaintKeys.list(),
    queryFn: () => getComplaints(uid),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    ...options,
  });

export function useGetComplaints(uid, options = {}) {
  return useQuery(getComplaintsQueryOptions(uid, options));
}
