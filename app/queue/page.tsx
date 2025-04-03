"use client";

import React from "react";
import { ProfileCard } from "../components/queue/ProfileCard";
import useProfileMatches from "./useProfileMatches";
import useProfileQueuing from "./useProfileQueuing";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";


export default function QueuePage() {
  const { data: session } = useSession();
  const currentUserEmail = session?.user?.email || "";

  // Filtering hook
  const {
    profiles,
    setProfiles,
    hasReachedEnd,
    setHasReachedEnd,
  } = useProfileMatches();

  // Queuing hook
  const {
    currentProfileIndex,
    handleSwipe,
    reviewSkippedProfiles,
    skippedProfiles,
  } = useProfileQueuing(profiles, setProfiles, setHasReachedEnd, currentUserEmail);

  return (
    <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      {/* Main Section - Full Screen */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 text-center pt-20">

        {hasReachedEnd ? (
          <>
            <h1 className="text-4xl font-bold text-teeUpGreen mb-4">Tee Up with Others</h1>
            <p className="text-lg font-semibold">
              You've reached the end!<br />No new profiles to show!
            </p>
            {skippedProfiles.length > 0 && (
              <button
                onClick={reviewSkippedProfiles}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
              >
                Review Skipped Profiles
              </button>
            )}
          </>
        ) : (
          <>
            {!hasReachedEnd && profiles.length > 0 && profiles[currentProfileIndex] && (
              <>
                <h1 className="text-4xl font-bold text-teeUpGreen mb-4">Tee Up with Others</h1>
                <ProfileCard
                  key={profiles[currentProfileIndex].id}
                  profile={profiles[currentProfileIndex]}
                  onSwipe={handleSwipe}
                />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

