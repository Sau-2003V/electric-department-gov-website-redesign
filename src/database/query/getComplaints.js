import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "@/database/supabase/supabase";

export const complaintKeys = {
  all: ["complaints"],
  list: () => [...complaintKeys.all, "list"],
  byUser: (uid) => [...complaintKeys.all, "user", uid],
  detail: (id) => [...complaintKeys.all, "detail", id],
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

/**
 * Fetches a single complaint by ID from public.complaints.
 * Falls back to mock complaints if not found or if mock ID format is used.
 * @param {string} id - Complaint UUID or mock identifier
 * @returns {Promise<object|null>}
 */
export async function getComplaintById(id) {
  if (!id) return null;

  try {
    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      return data;
    }
  } catch (err) {
    console.warn("Could not query DB by ID directly:", err?.message || err);
  }

  return null;
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

export const getComplaintByIdQueryOptions = (id, options = {}) =>
  queryOptions({
    queryKey: complaintKeys.detail(id),
    queryFn: () => getComplaintById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    ...options,
  });

export function useGetComplaint(id, options = {}) {
  return useQuery(getComplaintByIdQueryOptions(id, options));
}
