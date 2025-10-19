"use client";
import NoteList from "@/app/components/NoteList";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Notes() {
  const { user, userId, loading } = useUser();
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
    <div className="pt-24">
      <NoteList userId={user.id} />
    </div>
  );
}
