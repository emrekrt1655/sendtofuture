"use server";
import { supabase } from "@/lib/supabaseClient";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface NoteFormData {
  user_id: string;
  recipient_email: string;
  recipient_name?: string;
  content: string;
  send_at: string;
}

export async function submitNoteAction(formData: FormData) {
  const note: NoteFormData = {
    user_id: formData.get("user_id")?.toString() || "guest",
    recipient_email: formData.get("recipient_email")?.toString() || "",
    recipient_name: formData.get("recipient_name")?.toString() || "",
    content: formData.get("content")?.toString() || "",
    send_at: formData.get("send_at")?.toString() || "",
  };

  let sendAt: string | null = null;

  if (note.send_at) {
    const sendDate = new Date(note.send_at);
    const localDate = new Date(
      sendDate.getFullYear(),
      sendDate.getMonth(),
      sendDate.getDate(),
      sendDate.getHours(),
      sendDate.getMinutes()
    );
    sendAt = localDate.toISOString();
  }

  const { data, error } = await supabase.from("notes").insert([
    {
      user_id: note.user_id,
      recipient_email: note.recipient_email,
      recipient_name: note.recipient_name,
      content: note.content,
      send_at: sendAt || new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("❌ Error inserting note:", error.message);
    return { success: false, error: error.message };
  }

  console.log("✅ Note saved successfully:", data);
  return { success: true, guest: false, data };
}
