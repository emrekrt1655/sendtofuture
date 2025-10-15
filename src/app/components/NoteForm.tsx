"use client";

import { submitNoteAction } from "@/lib/createNoteAction";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function NoteForm({ userId }: { userId: string }) {
  const [result, setResult] = useState<string | null>(null);
  const { pending } = useFormStatus();

  async function handleSubmit(formData: FormData) {
    const res = await submitNoteAction(formData);
    if (res.guest) {
      setResult("Note logged to console (guest user).");
    } else if (res.success) {
      setResult("Note saved to Supabase successfully!");
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
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save Note"}
      </button>

      {result && <p className="text-sm text-center text-gray-600">{result}</p>}
    </form>
  );
}
