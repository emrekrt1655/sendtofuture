"use client";
import { createContext, useContext, ReactNode } from "react";
import { User } from "@supabase/supabase-js";

interface UserContextType {
  user: User | null;
  loading: boolean;
  userId: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  children,
  user,
  loading,
}: {
  children: ReactNode;
  user: User | null;
  loading: boolean;
}) => {
  const GUEST_USER_ID = process.env.NEXT_PUBLIC_GUEST_USER_ID;
  const userId = user?.id || GUEST_USER_ID || "";

  return (
    <UserContext.Provider value={{ user, loading, userId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
