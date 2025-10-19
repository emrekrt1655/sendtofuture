"use client";

import { useEffect, useState } from "react";
import { getNotes } from "@/lib/getNoteAction";
import { Note } from "@/types/Note";
import NoteCard from "./NoteCard";

export default function NoteList({ userId }: { userId: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotes() {
      setLoading(true);
      setError(null);

      try {
        const data = await getNotes(userId);
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setError("Failed to load notes. Please try again later.");
        setNotes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading notes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (notes.length === 0) {
    return (
      <p className="text-center text-gray-500">You don’t have any notes yet.</p>
    );
  }

  return (
    <div className="space-y-4 mt-24">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
