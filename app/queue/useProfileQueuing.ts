"use client";

import { useState } from "react";
import { Profile } from "../components/queue/profileCard";
import { sendMatchEmail } from "@/app/actions/sendMatchEmail";

/**
 * Custom hook for managing profile queuing functionality, including swiping actions
 * and reviewing skipped profiles.
 *
 * @param profiles - Array of profiles to be queued and displayed.
 * @param setProfiles - Function to update the list of profiles.
 * @param setHasReachedEnd - Function to set whether the end of the profile queue has been reached.
 * @param currentUserEmail - Email of the currently logged-in user.
 * 
 * @returns An object containing:
 * - `currentProfileIndex`: The index of the currently displayed profile.
 * - `handleSwipe`: Function to handle swipe actions (like or skip) on a profile.
 * - `reviewSkippedProfiles`: Function to review and reset skipped profiles.
 * - `skippedProfiles`: Array of profiles that were skipped.
 */
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

