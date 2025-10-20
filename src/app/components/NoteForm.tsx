"use client";

import { submitNoteAction } from "@/lib/postNoteAction";
import { Note } from "@/types/Note";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

interface NoteFormProps {
  userId: string;
  note?: Note;
}

export default function NoteForm({ userId, note }: NoteFormProps) {
  const router = useRouter();
  const [result, setResult] = useState<string | null>(null);
  const { pending } = useFormStatus();
  const isUpdate = !!note;

  const defaultSendAt =
    isUpdate && note.send_at
      ? new Date(note.send_at).toISOString().slice(0, 16)
      : undefined;

  async function handleSubmit(formData: FormData) {
    if (isUpdate && note.id) {
      formData.append("note_id", note.id);
    }

    const res = await submitNoteAction(formData, isUpdate);
    if (res.guest) {
      setResult("Note logged to console (guest user).");
    } else if (res.success) {
      setResult(`Note ${!isUpdate ? "saved" : "updated"} saved successfully!`);
      isUpdate && router.replace("/notes");
    } else {
      setResult(`Error: ${res.error}`);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-4 p-6 max-w-md w-full bg-white dark:bg-gray-900 rounded-lg shadow-md"
    >
      <input type="hidden" name="user_id" value={userId} />

      <div className="flex flex-col text-left">
        <label htmlFor="recipient_email" className="text-sm font-medium">
          Recipient Email *
        </label>
        <input
          required
          name="recipient_email"
          type="email"
          className="border rounded-md p-2 mt-1 dark:bg-gray-800"
          placeholder="example@email.com"
          defaultValue={isUpdate ? note.recipient_email : ""}
        />
      </div>

      <div className="flex flex-col text-left">
        <label htmlFor="recipient_name" className="text-sm font-medium">
          Recipient Name
        </label>
        <input
          name="recipient_name"
          type="text"
          className="border rounded-md p-2 mt-1 dark:bg-gray-800"
          placeholder="Optional"
          defaultValue={isUpdate ? note.recipient_name : ""}
        />
      </div>

      <div className="flex flex-col text-left">
        <label htmlFor="content" className="text-sm font-medium">
          Message *
        </label>
        <textarea
          required
          name="content"
          rows={4}
          className="border rounded-md p-2 mt-1 dark:bg-gray-800"
          placeholder="Write your message..."
          defaultValue={isUpdate ? note.content : ""}
        />
      </div>

      <div className="flex flex-col text-left">
        <label htmlFor="send_at" className="text-sm font-medium">
          Send At *
        </label>
        <input
          required
          name="send_at"
          type="datetime-local"
          className="border rounded-md p-2 mt-1 dark:bg-gray-800"
          defaultValue={isUpdate ? defaultSendAt : undefined}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
      >
        {pending
          ? isUpdate
            ? "Updating"
            : "Saving"
          : isUpdate
            ? "Update Note"
            : "Save Note"}
      </button>

      {result && <p className="text-sm text-center text-gray-600">{result}</p>}
    </form>
  );
}
