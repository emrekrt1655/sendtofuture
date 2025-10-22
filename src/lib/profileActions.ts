import { Profile, SupabaseSingleResponse } from "@/types/User";
import { supabase } from "./supabaseClient";

const userErrorCheck = (userId: string) => {
  if (
    !userId ||
    userId === "guest" ||
    userId === "00000000-0000-0000-0000-000000000000"
  ) {
    console.warn("getAuthUserProfile called with invalid userId:");
    return null;
  }
};

export const getAuthUserProfile = async (
  userId: string
): Promise<Profile | null> => {
  userErrorCheck(userId);

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

export async function updateAuthUserProfile(formData: FormData) {
  const userId = formData.get("user_id")?.toString() || "";

  const profileUpdates = {
    username: formData.get("username")?.toString() || "",
    photo_url: formData.get("photo_url")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    is_premium: formData.get("is_premium") === "on",
  };

  const { data, error } = await supabase
    .from("profiles")
    .update(profileUpdates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("❌ Error updating profile:", error.message);
    return { success: false, error: error.message };
  }

  console.log("✅ Profile updated successfully:", data);
  return { success: true, guest: data.id === "guest" };
}
