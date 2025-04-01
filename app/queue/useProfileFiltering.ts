import { useEffect, useState } from "react";
import users from "../../data/users.json";
import filters from "../../data/filters.json";
import { Profile } from "../components/queue/ProfileCard";

export default function useProfileFilter() {

    // Fetch initial profiles and set them as the default
    const initialProfiles: Profile[] = users;
    const [profiles, setProfiles] = useState(initialProfiles);
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
    const [skippedProfiles, setSkippedProfiles] = useState<Profile[]>([]);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);

    const applyFilters = () => {

        // Filter profiles based on user's preferences
        const filteredProfiles = initialProfiles.filter((profile) => {

            // Destructure filters and profile data
            const { filterAgeRange, filterCity, filterProvince, filterLocationRange,
                filterHcRange, filterGameLengthRange, filterPlaysCasually, filterPlaysCompetitively } = filters;

            const { age, city, province, hc, gameLength, isCompetitive } = profile;

            if (filterAgeRange && (age < filterAgeRange[0] || age > filterAgeRange[1])) return false;
            if (filterCity && city !== filterCity) return false;
            if (filterProvince && province !== filterProvince) return false;
            if (filterLocationRange && filterLocationRange < 0) return false;
            if (filterHcRange && (hc < filterHcRange[0] || hc > filterHcRange[1])) return false;
            if (filterGameLengthRange && (gameLength < filterGameLengthRange[0] || gameLength > filterGameLengthRange[1])) return false;
            if (filterPlaysCasually && !isCompetitive && !filterPlaysCompetitively) return false;
            if (filterPlaysCompetitively && isCompetitive && !filterPlaysCasually) return false;

            return true;
        });

        setProfiles(filteredProfiles);
        setCurrentProfileIndex(0); // Reset index to avoid out-of-bounds issues
        setHasReachedEnd(filteredProfiles.length === 0); // Mark as ended if no profiles match
    };

    useEffect(() => {
        applyFilters();
    }, []);

    return {
        profiles, currentProfileIndex, setProfiles, setCurrentProfileIndex,
        skippedProfiles, setSkippedProfiles, hasReachedEnd, setHasReachedEnd
    };
}

