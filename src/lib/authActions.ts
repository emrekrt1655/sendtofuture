import { supabase } from "./supabaseClient";

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      if (signInError.message.includes("Invalid login credentials")) {
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({
            email,
            password,
          });

        if (signUpError) throw signUpError;

        return { data: signUpData, isNewUser: true };
      } else {
        throw signInError;
      }
    }

    console.log("✅ User signed in successfully:", signInData);
    return { data: signInData, isNewUser: false };
  } catch (err) {
    if (err instanceof Error) {
      console.error("❌ Auth error:", err.message);
      throw new Error(err.message);
    } else {
      console.error("❌ Unknown auth error:", err);
    }
  }
};

export const signInWithOAuth = async (
  provider: "google" | "apple" | "facebook"
) => {
  console.log("🌐 Signing in with provider:", provider);

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${location.origin}/dashboard` },
  });

  if (error) throw new Error(error.message);
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};
