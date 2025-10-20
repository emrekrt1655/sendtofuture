"use client";

import { useState } from "react";
import { signInWithEmail, signInWithOAuth } from "@/lib/authActions";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function LoginCard() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRouteToDashboard = () => {
    router.push("/dashboard");
  };

  const handleEmailLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithEmail(form.email, form.password);

      if (result?.isNewUser) {
        alert("Account created! Check your email for verification.");
      } else {
        handleRouteToDashboard();
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred during login.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async () => {
    try {
      setLoading(true);
      await signInWithOAuth("google");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred during OAuth login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm p-8 border rounded-lg shadow-lg flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center">Login / Register</h2>

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        onClick={handleEmailLogin}
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {loading ? "Loading..." : "Login with Email"}
      </button>

      <div className="flex items-center gap-2 my-2">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="text-sm text-gray-500">Or</span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>

      <button
        onClick={handleOAuthLogin}
        className="w-full flex items-center justify-center gap-2 py-2 border rounded hover:shadow-md transition"
      >
        <FcGoogle size={24} />
        <span className="font-medium text-gray-700">Sign in with Google</span>
      </button>

      <p className="text-sm text-center text-gray-500 mt-4">
        If you do not want to login, go to the
        <span
          onClick={handleRouteToDashboard}
          className="cursor-pointer font-medium text-pink-700"
        >
          dashboard
        </span>
        and use the app as a guest!
      </p>
      <p className="text-sm text-center text-gray-500 mt-4">
        By registering, you agree to our Terms of Service.
      </p>
    </div>
  );
}
