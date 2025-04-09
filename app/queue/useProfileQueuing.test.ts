import useProfileQueuing from './useProfileQueuing';
import { Profile } from "../components/queue/profileCard";
import { act, renderHook } from '@testing-library/react';

jest.mock('@/app/actions/sendMatchEmail', () => ({
    sendMatchEmail: jest.fn().mockResolvedValue(true),
}));

import { sendMatchEmail } from '@/app/actions/sendMatchEmail';

const sampleProfiles: Profile[] = [
    {
        id: "user1",
        name: "Alice",
        age: 34,
        image: "/images/alice.jpg",
        city: "Vancouver",
        province: "BC",
        country: "Canada",
        gender: 1,
        handicap: 15,
        preferenceSet: {
            distanceRange: 50,
            preferredCourses: ["Fraserview Golf Course", "University Golf Club"],
            similarAge: true,
            sameGender: false,
            playWithSimilarHandicap: true,
            teeBoxes: 1,
            cart: 1,
            timeOfDay: [0, 1],
            weatherPreference: [1, 2],
            paceOfPlay: [1],
            conversationLevel: [1, 2],
            drinking: false,
            okayWithPartnerDrinking: true,
            smoking: false,
            okayWithPartnerSmoking: false,
            music: true,
            musicPreference: [1, 3],
            wager: false,
            wagerPreference: "",
        },
        email: "alice@example.com",
        profilePhoto: null,
    },
    {
        id: "user2",
        name: "Bob",
        age: 42,
        image: "/images/bob.jpg",
        city: "Burnaby",
        province: "BC",
        country: "Canada",
        gender: 0,
        handicap: 10,
        preferenceSet: {
            distanceRange: 75,
            preferredCourses: ["Burnaby Mountain Golf Course"],
            similarAge: false,
            sameGender: true,
            playWithSimilarHandicap: false,
            teeBoxes: 2,
            cart: 2,
            timeOfDay: [1],
            weatherPreference: [2],
            paceOfPlay: [2],
            conversationLevel: [0],
            drinking: true,
            okayWithPartnerDrinking: true,
            smoking: false,
            okayWithPartnerSmoking: false,
            music: false,
            musicPreference: [],
            wager: true,
            wagerPreference: "Friendly $10 Nassau",
        },
        email: "bob@example.com",
        profilePhoto: null,
    },
];

describe("useProfileQueuing", () => {
    const setProfiles = jest.fn();
    const setHasReachedEnd = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should initialize with the first profile", () => {
        const { result } = renderHook(() =>
            useProfileQueuing(sampleProfiles, setProfiles, setHasReachedEnd, "me@example.com")
        );
        expect(result.current.currentProfileIndex).toBe(0);
    });

    it.each([
        { action: "like", liked: true, expectedIndex: 1, shouldCallEmail: true },
        { action: "skip", liked: false, expectedIndex: 1, shouldCallEmail: false },
    ])(
        "should move to the next profile when $action is performed",
        async ({ liked, expectedIndex, shouldCallEmail }) => {
            const { result } = renderHook(() =>
                useProfileQueuing(sampleProfiles, setProfiles, setHasReachedEnd, "me@example.com")
            );
            await act(async () => {
                await result.current.handleSwipe(sampleProfiles[0], liked);
            });
            expect(result.current.currentProfileIndex).toBe(expectedIndex);
            if (shouldCallEmail) {
                expect(sendMatchEmail).toHaveBeenCalledWith({
                    to: "me@example.com",
                    likedUserEmail: "alice@example.com"
                });
            } else {
                expect(sendMatchEmail).not.toHaveBeenCalled();
            }
        }
    );

    it.each([
        { profiles: [sampleProfiles[0]], liked: true, shouldReachEnd: true },
        { profiles: [sampleProfiles[0]], liked: false, shouldReachEnd: true },
        { profiles: sampleProfiles, liked: false, shouldReachEnd: false },
    ])(
        "should handle end of profiles correctly when liked=$liked",
        async ({ profiles, liked, shouldReachEnd }) => {
            const { result } = renderHook(() =>
                useProfileQueuing(profiles, setProfiles, setHasReachedEnd, "me@example.com")
            );
            await act(async () => {
                await result.current.handleSwipe(profiles[0], liked);
            });
            if (shouldReachEnd) {
                expect(setHasReachedEnd).toHaveBeenCalledWith(true);
            } else {
                expect(setHasReachedEnd).not.toHaveBeenCalledWith(true);
            }
        }
    );
});