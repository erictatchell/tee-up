"use client";

import React from "react";
import { ProfileCard } from "../components/queue/ProfileCard";
import useProfileFilter from "./useProfileFiltering";
import useProfileQueuing from "./useProfileQueuing";

export default function QueuePage() {

  // Filtering hook
  const {
    profiles,
    setProfiles,
    setHasReachedEnd,
    hasReachedEnd,
  } = useProfileFilter();

  // Queuing hook
  const {
    currentProfileIndex,
    handleSwipe,
    reviewSkippedProfiles,
    skippedProfiles,
  } = useProfileQueuing(profiles, setProfiles, setHasReachedEnd);

  return (
    <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      {/* Main Section - Full Screen */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 text-center pt-20">
        {hasReachedEnd ? (
          <>
            <p className="text-lg font-semibold">You've reached the end!<br />No new profiles to show!</p>
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
            {/* Swipable Profile Card */}
            {/* <ProfileCard
              key={profiles[currentProfileIndex]?.id} // Force re-render when profile changes
              profile={profiles[currentProfileIndex]}
              onSwipe={handleSwipe}
            /> */}
          </>
        )}
      </main>
    </div>
  );
}

