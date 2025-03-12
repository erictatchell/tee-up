"use client";

import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";

export interface Profile {
  id: number;
  name: string;
  age: number;
  image: string;
  city: string;
  province: string;
  locationRange: number;
  hc: number;
  favouriteCourse: string;
  gameLength: number;
  hasCart: boolean;
  tees: string;
  isCompetitive: boolean;
}

interface ProfileCardProps {
  profile: Profile;
  onSwipe: (id: number, like: boolean) => void;
}

export function ProfileCard({ profile, onSwipe }: ProfileCardProps) {

  const controls = useAnimation();
  const [isSwiping, setIsSwiping] = useState(false);

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
          src={profile.image}
          alt={profile.name}
          className="object-cover object-top w-full h-full rounded-lg"
        />
      </div>
      <h1 className="text-3xl font-bold mt-4">{profile.name} {profile.age}</h1>
      <p className="text-m text-center">{profile.hc} HC<br></br></p>
      <h2 className="text-2xl text-center">Preferences</h2>
      <p className="text-m text-center">
        Preferred Region: Within {profile.locationRange} of {profile.city}, {profile.province}<br></br>
        Favourite Course: {profile.favouriteCourse}<br></br>
        Game Length: {profile.gameLength} holes<br></br>
        Cart: {profile.hasCart ? "Yes" : "No"}<br></br>
        Tees: {profile.tees}<br></br>
        Play Style: {profile.isCompetitive ? "Competitive" : "Casual"}
      </p>
      {/* Buttons for swiping */}
      <div className="mt-4 flex gap-4">
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
    </motion.div>
  );
}