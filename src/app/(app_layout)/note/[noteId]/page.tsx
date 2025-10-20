"use client";
import NoteForm from "@/app/components/NoteForm";
import { useUser } from "@/context/UserContext";
import { getNoteById } from "@/lib/getNoteAction";
import { Note } from "@/types/Note";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditNotePage() {
  const [note, setNote] = useState<Note | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  const { userId } = useUser();
  const { noteId } = useParams();

  useEffect(() => {
    if (!userId || !noteId) {
      setDataLoading(false);
      return;
    }

    async function fetchNote() {
      setDataLoading(true);
      const id = Array.isArray(noteId) ? noteId[0] : noteId;

      if (userId.includes("guest")) {
        setNote(null);
        setDataLoading(false);
        return;
      }

      try {
        const fetchedNote = await getNoteById(id as string);
        if (fetchedNote && fetchedNote.user_id === userId) {
          setNote(fetchedNote);
        } else {
          setNote(null);
        }
      } catch (error) {
        console.error("Error fetching note:", error);
        setNote(null);
      } finally {
        setDataLoading(false);
      }
    }
    fetchNote();
  }, [noteId, userId]);

  if (dataLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16">
        <p className="text-gray-600 text-lg">Loading note details...</p>
      </div>
    );
  }

  if (userId?.includes("guest")) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16">
        <p className="text-xl text-red-500">
          You must be logged in to edit notes.
        </p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16">
        <p className="text-xl text-red-500">
          Note not found or you do not have permission to edit it.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 pt-16">
      <div className="flex w-full max-w-6xl px-8 gap-8">
        <div className="mx-auto w-full max-w-md">
          <NoteForm userId={userId!} note={note} />
        </div>
      </div>
    </div>
  );
}
