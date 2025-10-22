import { Profile, SupabaseSingleResponse } from "@/types/User";
import { supabase } from "./supabaseClient";

export const getAuthUserProfile = async (
  userId: string
): Promise<Profile | null> => {
  if (
    !userId ||
    userId === "guest" ||
    userId === "00000000-0000-0000-0000-000000000000"
  ) {
    console.warn("getAuthUserProfile called with invalid userId:");
    return null;
  }

  const { data, error }: SupabaseSingleResponse = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error.message);
    return null;
  }
  return data as Profile;
};

export const updateAuthUserProfile = async (
  userId: string,
  updates: Partial<Omit<Profile, "id">>
): Promise<Profile | null> => {
  if (
    !userId ||
    userId === "guest" ||
    userId === "00000000-0000-0000-0000-000000000000"
  ) {
    console.warn("updateAuthUserProfile called with invalid userId:");
    return null;
  }
  const { data, error }: SupabaseSingleResponse = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating user profile:", error.message);
    return null;
  }
  return data as Profile;
};
