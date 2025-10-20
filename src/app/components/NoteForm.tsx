"use client";

import { submitNoteAction } from "@/lib/postNoteAction";
import { Note } from "@/types/Note";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const TipTapEditor = dynamic(() => import("@/app/components/TipTapEditor"), {
  ssr: false,
  loading: () => (
    <div className="border rounded-md p-4 mt-1 dark:bg-gray-800 flex-grow min-h-[350px]">
      Loading editor...
    </div>
  ),
});

interface NoteFormProps {
  userId: string;
  note?: Note;
}

const PendingButton = ({ isUpdate }: { isUpdate: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-full min-h-[48px] px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending
        ? isUpdate
          ? "Updating..."
          : "Saving..."
        : isUpdate
        ? "Update Note"
        : "Save Note"}
    </button>
  );
};

export default function NoteForm({ userId, note }: NoteFormProps) {
  const router = useRouter();
  const [result, setResult] = useState<string | null>(null);
  
  const isUpdate = !!note;
  const [content, setContent] = useState(note?.content || "");

  const defaultSendAt =
    isUpdate && note.send_at
      ? new Date(note.send_at).toISOString().slice(0, 16)
      : undefined;

  async function handleSubmit(formData: FormData) {
    if (isUpdate && note.id) {
      formData.append("note_id", note.id);
    }

    formData.set("content", content);

    const res = await submitNoteAction(formData, isUpdate);
    if (res.guest) {
      setResult("Note logged to console (guest user).");
    } else if (res.success) {
      setResult(`Note ${!isUpdate ? "saved" : "updated"} successfully!`);
      isUpdate && router.replace("/notes");
    } else {
      setResult(`Error: ${res.error}`);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col p-8 w-full max-w-4xl h-[85vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl space-y-6 mx-auto"
    >
      <input type="hidden" name="user_id" value={userId} />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
        
        <div className="flex flex-col text-left">
          <label htmlFor="recipient_name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Recipient Name
          </label>
          <input
            name="recipient_name"
            type="text"
            className="border border-gray-300 rounded-lg p-2 mt-1 dark:bg-gray-800 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Optional"
            defaultValue={isUpdate ? note.recipient_name : ""}
          />
        </div>

        <div className="flex flex-col text-left">
          <label htmlFor="recipient_email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Recipient Email *
          </label>
          <input
            required
            name="recipient_email"
            type="email"
            className="border border-gray-300 rounded-lg p-2 mt-1 dark:bg-gray-800 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="example@email.com"
            defaultValue={isUpdate ? note.recipient_email : ""}
          />
        </div>
        
        <div className="flex flex-col text-left">
          <label htmlFor="send_at" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Send At *
          </label>
          <input
            required
            name="send_at"
            type="datetime-local"
            className="border border-gray-300 rounded-lg p-2 mt-1 dark:bg-gray-800 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
            defaultValue={isUpdate ? defaultSendAt : undefined}
          />
        </div>
        
        <div className="flex flex-col justify-end"> 
            <PendingButton isUpdate={isUpdate} />
        </div>

      </div>

      <div className="flex flex-col text-left flex-grow min-h-0"> 
        <label htmlFor="content" className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Message *
        </label>
        <div className="flex-grow min-h-[300px]"> 
          <TipTapEditor
            defaultContent={note?.content || ""}
            onChange={(html) => setContent(html)}
          />
        </div>
      </div>

      {result && (
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400 flex-shrink-0">
          {result}
        </p>
      )}
    </form>
  );
}