"use client";

import { Profile } from "@/types/User";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import {
  getAuthUserProfile,
  updateAuthUserProfile,
  upgradeUserToPremium,
  cancelUserPremium,
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
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function handleAction(formData: FormData) {
    const res = await updateAuthUserProfile(formData);
    if (res.success) {
      const updatedProfile = await getAuthUserProfile(profile.id);
      if (updatedProfile && onUpdate) onUpdate(updatedProfile);
      setResult("✅ Profile updated successfully!");
      setTimeout(() => setResult(""), 2000);
    } else {
      setResult(`❌ Error: ${res.error || "Unknown error"}`);
    }
  }

  async function handleUpgradeToPremium(userId: string) {
    try {
      setIsSaving(true);
      const res = await upgradeUserToPremium(userId);
      if (res.success) {
        setResult("✅ Upgrade to Premium successful!");
        setTimeout(() => setResult(""), 2000);
        if (onUpdate && res.data) onUpdate(res.data);
        setShowPaymentForm(false);
      } else {
        alert(`❌ Upgrade failed: ${res.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Upgrade failed:", err);
      alert("❌ Upgrade failed. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleCancelPremium(userId: string) {
    try {
      setIsSaving(true);
      const res = await cancelUserPremium(userId);
      if (res.success) {
        setResult("⚡ Premium membership canceled!");
        setTimeout(() => setResult(""), 2000);
        if (onUpdate && res.data) onUpdate(res.data);
      } else {
        alert(`❌ Cancel failed: ${res.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("❌ Cancel failed. Please try again.");
    } finally {
      setIsSaving(false);
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

      {/* === PROFILE FIELDS === */}
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

      {/* === PREMIUM SECTION === */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all duration-300">
        {profile.is_premium ? (
          <div className="flex flex-col items-center space-y-3">
            <span className="text-lg font-semibold text-indigo-600">
              🌟 Premium Membership Active
            </span>
            <span className="text-sm text-gray-500">
              Thank you for supporting us!
            </span>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleCancelPremium(profile.id)}
              className="text-sm text-red-500 hover:underline mt-1 disabled:opacity-60"
            >
              {isSaving ? "Canceling..." : "Cancel Premium Membership"}
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setShowPaymentForm((prev) => !prev)}
              className="w-full px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
            >
              {showPaymentForm ? "Cancel Upgrade" : "Upgrade to Premium"}
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                showPaymentForm ? "max-h-[500px] mt-4" : "max-h-0"
              }`}
            >
              <div className="flex flex-col space-y-4 p-4 border border-gray-200 rounded-lg bg-white dark:bg-gray-900 shadow-inner">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  💳 Enter Payment Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Card Holder</label>
                    <input
                      type="text"
                      className={inputClass}
                      defaultValue="Emre Developer"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Card Number</label>
                    <input
                      type="text"
                      className={inputClass}
                      defaultValue="4242 4242 4242 4242"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Expiry Date</label>
                    <input
                      type="text"
                      className={inputClass}
                      defaultValue="12/28"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>CVC</label>
                    <input
                      type="text"
                      className={inputClass}
                      defaultValue="123"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleUpgradeToPremium(profile.id)}
                  className="mt-4 w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-60"
                >
                  {isSaving ? "Processing..." : "Confirm Upgrade"}
                </button>
              </div>
            </div>
          </>
        )}
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
