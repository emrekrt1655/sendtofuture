"use server";

import { supabase } from "@/lib/supabaseClient";

export async function getNotes(userId: string) {
  if (!userId || userId === "guest") {
    console.log("Guest user – skipping fetch from Supabase.");
    return [];
  }

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Error fetching notes:", error.message);
    return [];
  }

  return data || [];
}