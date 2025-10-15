"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import DropdownMenu from "@/app/components/DropdownMenu";
import NoteForm from "../components/NoteForm";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const userId = user?.id || "guest";

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data?.user) {
          console.log("No user session found, continuing as a Guest.");
          setUser(null);
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  const userName = user?.email ? user.email.split("@")[0] : "Guest";

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Checking session...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
      <header className="absolute top-4 right-6">
        <DropdownMenu
          label={
            <>
              Hi, <span className="font-semibold">{userName}</span>
            </>
          }
          items={[
            {
              label: "Sign out",
              onClick: handleSignOut,
              disabled: !user,
            },
          ]}
          disabled={!user}
        />
      </header>
      <main className="flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold mb-4">Create a Note</h1>
        <NoteForm userId={userId} />
      </main>
    </main>
  );
}
