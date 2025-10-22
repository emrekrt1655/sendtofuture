"use client";

import { Profile } from "@/types/User";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import {
  getAuthUserProfile,
  updateAuthUserProfile,
} from "@/lib/profileActions";

interface ProfileFormProps {
  profile: Profile;
  onUpdate?: (updatedProfile: Profile) => void;
}
const PendingButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-full min-h-[48px] px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Saving..." : "Save Profile"}
    </button>
  );
};

export default function ProfileForm({ profile, onUpdate }: ProfileFormProps) {
  const [result, setResult] = useState<string | null>(null);

  async function handleAction(formData: FormData) {
    const res = await updateAuthUserProfile(formData);

    if (res.success) {
      const updatedProfile = await getAuthUserProfile(profile.id);

      if (updatedProfile && onUpdate) onUpdate(updatedProfile);
      setResult("✅ Profile updated successfully!");
      setTimeout(() => {
        setResult("");
      }, 2000);
    } else {
      setResult(`❌ Error: ${res.error || "Unknown error"}`);
    }
  }

  const inputClass =
    "border border-gray-300 rounded-lg p-3 mt-1 dark:bg-gray-800 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 w-full";
  const labelClass = "text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <form
      action={handleAction}
      className="flex flex-col p-8 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl space-y-6 mx-auto"
    >
      <input type="hidden" name="user_id" value={profile.id} />

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
        Edit Your Profile
      </h2>

      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col text-left">
          <label htmlFor="username" className={labelClass}>
            Username *
          </label>
          <input
            required
            name="username"
            type="text"
            className={inputClass}
            placeholder="Your unique handle"
            defaultValue={profile.username}
          />
        </div>

        <div className="flex flex-col text-left">
          <label htmlFor="photo_url" className={labelClass}>
            Profile Photo URL
          </label>
          <input
            name="photo_url"
            type="url"
            className={inputClass}
            placeholder="https://example.com/photo.jpg"
            defaultValue={profile.photo_url || ""}
          />
        </div>

        <div className="flex flex-col text-left">
          <label htmlFor="description" className={labelClass}>
            Bio / Description
          </label>
          <textarea
            name="description"
            rows={4}
            className={`${inputClass} resize-none`}
            placeholder="Tell us a little about yourself..."
            defaultValue={profile.description || ""}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <input
          id="is_premium"
          name="is_premium"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
          defaultChecked={profile.is_premium}
        />
        <label
          htmlFor="is_premium"
          className="text-sm font-medium text-gray-800 dark:text-gray-200"
        >
          Premium Membership
        </label>
        <span className="text-xs text-indigo-500 ml-auto font-semibold">
          {profile.is_premium ? "Active" : "Standard"}
        </span>
      </div>

      <div className="flex justify-end">
        <PendingButton />
      </div>

      {result && (
        <p
          className={`mt-4 text-sm text-center font-medium ${
            result.startsWith("❌") ? "text-red-500" : "text-green-500"
          } flex-shrink-0`}
        >
          {result}
        </p>
      )}
    </form>
  );
}
