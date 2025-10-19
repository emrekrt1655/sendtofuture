"use client";

import NoteForm from "@/app/components/NoteForm";
import { useUser } from "@/context/UserContext";
export default function DashboardPage() {
  const { userId, loading } = useUser();

  if (loading || !userId) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 pt-16">
      <div className="flex w-full max-w-6xl px-8 gap-8">
        <div className="mx-auto w-full max-w-md">
          <NoteForm userId={userId} />
        </div>
      </div>
    </div>
  );
}
