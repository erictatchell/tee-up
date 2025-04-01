"use client";

import { useState } from "react";
import { Profile } from "../components/queue/ProfileCard";

export default function useProfileQueuing(
    profiles: Profile[],
    setProfiles: (profiles: Profile[]) => void,
    setHasReachedEnd: (value: boolean) => void
) {

    // State to keep track of the current profile index
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
    const [skippedProfiles, setSkippedProfiles] = useState<Profile[]>([]);

    // Function to handle swipe action
    const handleSwipe = async (id: number, like: boolean) => {
        console.log(`User ${id} was ${like ? 'liked' : 'skipped'}`);

        // Add the profile to the skipped list if it was skipped
        if (!like) {
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

