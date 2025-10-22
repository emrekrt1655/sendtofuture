"use client";
import ProfileForm from "@/app/components/ProfileForm";
import { useUser } from "@/context/UserContext";
import { getAuthUserProfile } from "@/lib/profileActions";
import { Profile } from "@/types/User";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { user, loading: userLoading } = useUser();
  const userId = user?.id;
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userLoading) {
      return;
    }
    if (!userId) {
      setIsLoading(false);
      return;
    }
    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAuthUserProfile(userId);
        setProfileData(data);

        if (!data) {
          setError("There is no profile data available.");
        }
      } catch (error) {
        console.error("Profile fetching error: ", error);
        setError("Profile fetching error.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, [userId, userLoading]);

  if (userLoading || isLoading) {
        return <div>Profile Loading...</div>;
    }

    if (!user) {
        return <div>Please login to see profile data!</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      {profileData ? (
        <ProfileForm profile={profileData}   onUpdate={(updatedProfile) => setProfileData(updatedProfile)}
/>
      ) : (
        <div>No profile data found.</div>
      )}
    </div>  
  );
}
