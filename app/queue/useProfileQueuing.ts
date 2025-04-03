"use client";

import { useState } from "react";
import { Profile } from "../components/queue/ProfileCard";
import { sendMatchEmail } from "@/app/actions/sendMatchEmail";

export default function useProfileQueuing(
    profiles: Profile[],
    setProfiles: (profiles: Profile[]) => void,
    setHasReachedEnd: (value: boolean) => void,
    currentUserEmail: string
) {

    // State to keep track of the current profile index
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
    const [skippedProfiles, setSkippedProfiles] = useState<Profile[]>([]);

    // Function to handle swipe action
    const handleSwipe = async (profile: Profile, like: boolean) => {
        console.log(`User ${profile.id} was ${like ? 'liked' : 'skipped'}`);

        // Add the profile to the skipped list if it was skipped
        if (like) {
            await sendMatchEmail({
              to: currentUserEmail,             // logged-in user's email
              likedUserEmail: profile.email!,  // liked user's email
            });
          
            setSkippedProfiles((prev) => [...prev, profiles[currentProfileIndex]]);
        }

        // Wait for animation to finish before moving to the next profile
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Move to the next profile
        if (currentProfileIndex === profiles.length - 1) {
            setHasReachedEnd(true);
        } else {
            setCurrentProfileIndex((prevIndex) => prevIndex + 1);
        }
    };

    // Function to review skipped profiles
    const reviewSkippedProfiles = () => {
        console.log('Reviewing skipped profiles', skippedProfiles);
        if (skippedProfiles.length > 0) {
            setProfiles(skippedProfiles);
            setCurrentProfileIndex(0);
            setSkippedProfiles([]);
            setHasReachedEnd(false);
        }
    }

    return { currentProfileIndex, handleSwipe, reviewSkippedProfiles, skippedProfiles };
}

