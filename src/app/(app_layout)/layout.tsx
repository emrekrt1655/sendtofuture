"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import DropdownMenu from "@/app/components/DropdownMenu";
import { User } from "@supabase/supabase-js";
import { UserProvider } from "@/context/UserContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      let currentUser: User | null = null;

      try {
        const { data, error } = await supabase.auth.getUser();

        if (!error && data?.user) {
          currentUser = data.user;
        }
      } catch (error) {
        console.error("Error during session check:", error);
      } finally {
        setUser(currentUser);

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

  const isDashboard = pathname === "/dashboard";
  const isNotesList = pathname === "/notes";
  const isEditNote = pathname?.startsWith("/note/") && !isNotesList;
  const dynnamicList = [];

  if (isDashboard) {
    dynnamicList.push({
      label: "View Notes",
      onClick: () => router.push("/notes"),
      disabled: false,
    });
  } else if (isNotesList) {
    dynnamicList.push({
      label: "Create Note",
      onClick: () => router.push("/dashboard"),
      disabled: false,
    });
  } else if (isEditNote) {
    dynnamicList.push(
      {
        label: "Create Note",
        onClick: () => router.push("/dashboard"),
        disabled: false,
      },
      {
        label: "View Notes",
        onClick: () => router.push("/notes"),
        disabled: false,
      }
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Checking session...</p>
      </div>
    );
  }

  return (
    <UserProvider user={user} loading={loading}>
      <main className="min-h-screen text-center">
        <header className="absolute top-4 right-6 z-10">
          <DropdownMenu
            label={
              <>
                Hi, <span className="font-semibold">{userName}</span>
              </>
            }
            items={[
              ...dynnamicList,
              {
                label: "Sign out",
                onClick: handleSignOut,
                disabled: !user,
              },
            ]}
            disabled={!user}
          />
        </header>

        {children}
      </main>
    </UserProvider>
  );
}
