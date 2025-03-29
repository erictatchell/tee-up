"use client";

import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";

const GENDERS: Record<number, string> = { 0: "Male", 1: "Female", 2: "Other", 3: "Prefer not to say" };
const CART_OPTIONS: Record<number, string> = { 0: "No", 1: "Yes", 2: "Doesn’t Matter" };
const TEE_BOX_OPTIONS: Record<number, string> = { 0: "Tips", 1: "Blue", 2: "White", 3: "Red" };
const TIME_OF_DAY_OPTIONS: Record<number, string> = { 0: "Morning", 1: "Afternoon", 2: "Evening" };
const WEATHER_OPTIONS: Record<number, string> = { 0: "Rain", 1: "Overcast", 2: "Sunny" };
const PACE_OF_PLAY_OPTIONS: Record<number, string> = { 0: "Slow", 1: "Normal Speed", 2: "Fast" };
const CONVERSATION_LEVEL_OPTIONS: Record<number, string> = { 0: "Quiet", 1: "Doesn’t Matter", 2: "Chatty" };
const MUSIC_PREFERENCES: Record<number, string> = { 0: "Rock", 1: "Pop", 2: "Jazz", 3: "Classical", 4: "Hip-Hop", 5: "Country" };

const GENDERS: Record<number, string> = { 0: "Male", 1: "Female", 2: "Other", 3: "Prefer not to say" };
const CART_OPTIONS: Record<number, string> = { 0: "No", 1: "Yes", 2: "Doesn’t Matter" };
const TEE_BOX_OPTIONS: Record<number, string> = { 0: "Tips", 1: "Blue", 2: "White", 3: "Red" };
const TIME_OF_DAY_OPTIONS: Record<number, string> = { 0: "Morning", 1: "Afternoon", 2: "Evening" };
const WEATHER_OPTIONS: Record<number, string> = { 0: "Rain", 1: "Overcast", 2: "Sunny" };
const PACE_OF_PLAY_OPTIONS: Record<number, string> = { 0: "Slow", 1: "Normal Speed", 2: "Fast" };
const CONVERSATION_LEVEL_OPTIONS: Record<number, string> = { 0: "Quiet", 1: "Doesn’t Matter", 2: "Chatty" };
const MUSIC_PREFERENCES: Record<number, string> = { 0: "Rock", 1: "Pop", 2: "Jazz", 3: "Classical", 4: "Hip-Hop", 5: "Country" };

export interface Profile {
  id: string;  // Changed from number to string to match cuid()
  name: string;
  age: number;
  image: string | null;  // Made nullable
  city: string;
  province: string;
  country: string;  // Added country
  gender: number;  // Added gender (0, 1, 2 enum)
  handicap: number;  // Changed from hc to handicap and number to float

  // Replaced old fields with preference set structure
  preferenceSet: {
    distanceRange: number;
    preferredCourses: string[];  // Changed from favouriteCourse
    similarAge: boolean;
    sameGender: boolean;
    playWithSimilarHandicap: boolean;
    teeBoxes: number;  // Changed from string tees
    cart: number;  // Changed from boolean hasCart
    timeOfDay: number[];
    weatherPreference: number[];
    paceOfPlay: number[];
    conversationLevel: number[];
    drinking: boolean;
    okayWithPartnerDrinking: boolean;
    smoking: boolean;
    okayWithPartnerSmoking: boolean;
    music: boolean;
    musicPreference: number[];
    wager: boolean;
    wagerPreference: string;
  };

  // Removed deprecated fields:
  // - locationRange (replaced by distanceRange)
  // - favouriteCourse (replaced by preferredCourses array)
  // - gameLength
  // - hasCart (replaced by cart number)
  // - tees (replaced by teeBoxes number)
  // - isCompetitive
}

interface ProfileCardProps {
  profile: Profile;
  onSwipe: (id: string, like: boolean) => void;
  onSwipe: (id: string, like: boolean) => void;
}

export function ProfileCard({ profile, onSwipe }: ProfileCardProps) {

  const controls = useAnimation();
  const [isSwiping, setIsSwiping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDragEnd = async (_event: any, info: any) => {

    if (isSwiping) return; // Prevent multiple swipes
    setIsSwiping(true);

    const threshold = 100;

    if (info.offset.x > threshold) {
      await controls.start({ x: 500, opacity: 0 }); // Swipe right
      await onSwipe(profile.id, true);
    } else if (info.offset.x < -threshold) {
      await controls.start({ x: -500, opacity: 0 }); // Swipe left
      await onSwipe(profile.id, false);
    } else {
      controls.start({ x: 0, opacity: 1 }); // Return to center
    }
  }

  useEffect(() => {
    setIsSwiping(false);
  }, [profile]);

  return (
    <motion.div
      className="w-[480px] p-6 bg-teeUpGreen rounded-2xl shadow-lg flex flex-col items-center text-white"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-[400px] h-[400px] p-6 overflow-hidden rounded-lg">
        <img
          src={profile.image || "/images/empty_profile.png"} // Use empty_profile.png as fallback
          alt={profile.name}
          className="object-cover object-top w-full h-full rounded-lg"
        />
      </div>
      <h1 className="text-3xl font-bold mt-4">{profile.name}, {profile.age}</h1>
      <p className="text-m">
        Gender: {GENDERS[profile.gender]} • Handicap: {profile.handicap} • {profile.city}, {profile.province}
      </p>

      <div className="mt-4 text-center">
        <h2 className="text-2xl">Preferences</h2>
        <p>Max Distance: {profile.preferenceSet.distanceRange} km</p>
        <p>Courses: {profile.preferenceSet.preferredCourses.join(", ")}</p>
        <p>Tee: {TEE_BOX_OPTIONS[profile.preferenceSet.teeBoxes]}</p>
        <p>Cart: {CART_OPTIONS[profile.preferenceSet.cart]}</p>
      </div>

      {isExpanded && (
        <div className="mt-4 text-center">
          <p>Time of Day: {profile.preferenceSet.timeOfDay.map(t => TIME_OF_DAY_OPTIONS[t]).join(", ")}</p>
          <p>Weather: {profile.preferenceSet.weatherPreference.map(w => WEATHER_OPTIONS[w]).join(", ")}</p>
          <p>Pace of Play: {profile.preferenceSet.paceOfPlay.map(p => PACE_OF_PLAY_OPTIONS[p]).join(", ")}</p>
          <p>Conversation Level: {profile.preferenceSet.conversationLevel.map(c => CONVERSATION_LEVEL_OPTIONS[c]).join(", ")}</p>
          <p>Drinking: {profile.preferenceSet.drinking ? "Yes" : "No"}</p>
          <p>Okay with Partner Drinking: {profile.preferenceSet.okayWithPartnerDrinking ? "Yes" : "No"}</p>
          <p>Smoking: {profile.preferenceSet.smoking ? "Yes" : "No"}</p>
          <p>Okay with Partner Smoking: {profile.preferenceSet.okayWithPartnerSmoking ? "Yes" : "No"}</p>
          <p>Music: {profile.preferenceSet.music ? "Yes" : "No"}</p>
          {profile.preferenceSet.music && (
            <p>Music Preferences: {profile.preferenceSet.musicPreference.map(m => MUSIC_PREFERENCES[m]).join(", ")}</p>
          )}
          <p>Wager: {profile.preferenceSet.wager ? "Yes" : "No"}</p>
          {profile.preferenceSet.wager && (
            <p>Wager Preference: {profile.preferenceSet.wagerPreference}</p>
          )}
        </div>
      )}

      <div className="mt-4 w-full flex justify-between items-center">
        {/* Skip Button - Left */}
      <h1 className="text-3xl font-bold mt-4">{profile.name}, {profile.age}</h1>
      <p className="text-m">
        Gender: {GENDERS[profile.gender]} • Handicap: {profile.handicap} • {profile.city}, {profile.province}
      </p>

      <div className="mt-4 text-center">
        <h2 className="text-2xl">Preferences</h2>
        <p>Max Distance: {profile.preferenceSet.distanceRange} km</p>
        <p>Courses: {profile.preferenceSet.preferredCourses.join(", ")}</p>
        <p>Tee: {TEE_BOX_OPTIONS[profile.preferenceSet.teeBoxes]}</p>
        <p>Cart: {CART_OPTIONS[profile.preferenceSet.cart]}</p>
      </div>

      {isExpanded && (
        <div className="mt-4 text-center">
          <p>Time of Day: {profile.preferenceSet.timeOfDay.map(t => TIME_OF_DAY_OPTIONS[t]).join(", ")}</p>
          <p>Weather: {profile.preferenceSet.weatherPreference.map(w => WEATHER_OPTIONS[w]).join(", ")}</p>
          <p>Pace of Play: {profile.preferenceSet.paceOfPlay.map(p => PACE_OF_PLAY_OPTIONS[p]).join(", ")}</p>
          <p>Conversation Level: {profile.preferenceSet.conversationLevel.map(c => CONVERSATION_LEVEL_OPTIONS[c]).join(", ")}</p>
          <p>Drinking: {profile.preferenceSet.drinking ? "Yes" : "No"}</p>
          <p>Okay with Partner Drinking: {profile.preferenceSet.okayWithPartnerDrinking ? "Yes" : "No"}</p>
          <p>Smoking: {profile.preferenceSet.smoking ? "Yes" : "No"}</p>
          <p>Okay with Partner Smoking: {profile.preferenceSet.okayWithPartnerSmoking ? "Yes" : "No"}</p>
          <p>Music: {profile.preferenceSet.music ? "Yes" : "No"}</p>
          {profile.preferenceSet.music && (
            <p>Music Preferences: {profile.preferenceSet.musicPreference.map(m => MUSIC_PREFERENCES[m]).join(", ")}</p>
          )}
          <p>Wager: {profile.preferenceSet.wager ? "Yes" : "No"}</p>
          {profile.preferenceSet.wager && (
            <p>Wager Preference: {profile.preferenceSet.wagerPreference}</p>
          )}
        </div>
      )}

      <div className="mt-4 w-full flex justify-between items-center">
        {/* Skip Button - Left */}
        <button
          onClick={async () => {
            if (isSwiping) return;
            setIsSwiping(true);
            await controls.start({ x: -500, opacity: 0 });
            await onSwipe(profile.id, false);
            setIsSwiping(false);
          }}
          className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          Skip
        </button>

        {/* Expand/Collapse Button - Center */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>

        {/* Like Button - Right */}

        {/* Expand/Collapse Button - Center */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>

        {/* Like Button - Right */}
        <button
          onClick={async () => {
            if (isSwiping) return;
            setIsSwiping(true);
            await controls.start({ x: 500, opacity: 0 });
            await onSwipe(profile.id, true);
            setIsSwiping(false);
          }}
          className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          Like
        </button>
      </div>
    </motion.div >
    </motion.div >
  );
}