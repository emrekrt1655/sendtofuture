// Notes.tsx
"use client";
import NoteList from "@/app/components/NoteList";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Notes() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      console.log("Access denied. Redirecting.");
      router.replace("/");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-white border-b border-gray-800 pb-3">
          Messages
        </h1>
        <NoteList userId={user.id} />
      </div>
    </div>
  );
}
