"use client";

import { useEffect, useState } from "react";
import { getNotes } from "@/lib/getNoteAction";

interface Note {
  id: string;
  recipient_email: string;
  recipient_name?: string;
  content: string;
  send_at: string;
  created_at: string;
}

export default function NoteList({ userId }: { userId: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      if (!userId || userId === "guest") {
        setNotes([]);
        setLoading(false);
        return;
      }

      const data = await getNotes(userId);
      setNotes(data);
      setLoading(false);
    }

    fetchNotes();
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading notes...</p>;
  }

  if (notes.length === 0) {
    return (
      <p className="text-center text-gray-500">
        {userId === "guest"
          ? "Login to view your saved notes."
          : "You don’t have any notes yet."}
      </p>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {note.recipient_name || note.recipient_email}
            </h3>
            <span className="text-xs text-gray-500">
              {new Date(note.send_at).toLocaleString()}
            </span>
          </div>
          <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {note.content}
          </p>
        </div>
      ))}
    </div>
  );
}
