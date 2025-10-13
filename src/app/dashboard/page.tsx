"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="px-4 py-2 hover:bg-gray-200 hover:text-black rounded-full shadow-sm"
            disabled={!user}
          >
            Hi, <span className="font-semibold">{userName}</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40  shadow-lg">
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2  hover:bg-gray-200 hover:text-black"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </header>
      <h1 className="text-4xl font-bold">Welcome to Dashboard</h1>
      <p className="text-gray-600">Logged in as: {userName}</p>
    </main>
  );
}
