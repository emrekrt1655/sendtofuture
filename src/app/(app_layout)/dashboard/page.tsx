"use client";

import NoteForm from "@/app/components/NoteForm";
import { useUser } from "@/context/UserContext";
export default function DashboardPage() {
  const { userId, loading } = useUser();

  if (loading || !userId) {
    return null;
  }

  return (
   <div className="flex flex-col items-center justify-center py-12 px-4 w-full h-screen bg-gray-50 dark:bg-gray-950">
      <div className="w-full h-full max-w-4xl">
        <NoteForm userId={userId} />
      </div>
    </div>
  );
}
