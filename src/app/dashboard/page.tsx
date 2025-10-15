"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import DropdownMenu from "@/app/components/DropdownMenu";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const GUEST_USER_ID = "00000000-0000-0000-0000-000000000000";
  const userId = user?.id || GUEST_USER_ID;

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

      <div className="flex w-full max-w-6xl mt-10 px-8 gap-8">
        {userId === GUEST_USER_ID? (
          <div className="mx-auto w-full max-w-md">
            <NoteForm userId={userId} />
          </div>
        ) : (
          <>
            <div className="flex-2">
              <NoteForm userId={userId} />
            </div>
            <div className="flex-1">
              <NoteList userId={userId} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
