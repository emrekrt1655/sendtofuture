"use server";
import { supabase } from "@/lib/supabaseClient";

interface NoteFormData {
  user_id: string;
  recipient_email: string;
  recipient_name?: string;
  content: string;
  send_at: string;
  note_id?: string;
}

export async function submitNoteAction(formData: FormData, isUpdate: boolean) {
  const note: NoteFormData = {
    user_id: formData.get("user_id")?.toString() || "guest",
    recipient_email: formData.get("recipient_email")?.toString() || "",
    recipient_name: formData.get("recipient_name")?.toString() || "",
    content: formData.get("content")?.toString() || "",
    send_at: formData.get("send_at")?.toString() || "",
    note_id: formData.get("note_id")?.toString() || undefined,
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

  const finalSendAt = sendAt || new Date().toISOString();

  const notePayload = {
    user_id: note.user_id,
    recipient_email: note.recipient_email,
    recipient_name: note.recipient_name,
    content: note.content,
    send_at: finalSendAt,
  };

  let actionResult;

  if (isUpdate && note.note_id) {
    if (note.user_id.includes("guest")) {
      return { success: false, error: "Guest users cannot update notes." };
    }
    actionResult = await supabase
      .from("notes")
      .update(notePayload)
      .eq("id", note.note_id)
      .eq("user_id", note.user_id);
  } else if (!isUpdate) {
    actionResult = await supabase.from("notes").insert([notePayload]).select();
  } else {
    return { success: false, error: "Cannot update note: Missing Note ID." };
  }
  const { data, error } = actionResult;

  if (error) {
    console.error(
      `❌ Error ${isUpdate ? "updating" : "inserting"} note:`,
      error.message
    );
    return { success: false, error: error.message };
  }

  console.log(`✅ Note ${isUpdate ? "updated" : "saved"} successfully.`, data);
  return { success: true, guest: note.user_id === "guest" };
}
