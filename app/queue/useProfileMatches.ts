"use client";

import { useEffect, useState } from "react";
import { Profile } from "../components/queue/ProfileCard";

type MatchResponse = {
  user: Profile;
  score: number;
};

export default function useProfileMatches() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch("/api/matches");
        const data: MatchResponse[] = await res.json();

        // Extract and store only the user objects (ignore score for now)
        const matchedProfiles = data.map((match) => match.user);
        setProfiles(matchedProfiles);
        setHasReachedEnd(matchedProfiles.length === 0);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    }

    fetchMatches();
  }, []);

  return {
    profiles,
    setProfiles,
    hasReachedEnd,
    setHasReachedEnd,
  };
}
