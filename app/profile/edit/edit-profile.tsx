"use client";

import { useState } from "react";

// Define a mapping for cart preference values
const CART_OPTIONS: Record<number, string> = {
  0: "No",
  1: "Yes",
  2: "Doesn’t Matter",
};

export default function EditProfile({ user, preferences, saveUserData }: any) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    profilePhoto: user.profilePhoto || "",
    handicap: user.handicap || "",
    age: user.age || "",
    gender: user.gender || "",
    country: user.country || "",
    province: user.province || "",
    city: user.city || "",

    distanceRange: preferences.distanceRange || "",
    preferredCourses: preferences.preferredCourses?.join(", ") || "",
    similarAge: preferences.similarAge || false,
    sameGender: preferences.sameGender || false,
    playWithSimilarHandicap: preferences.playWithSimilarHandicap || false,
    teeBoxes: preferences.teeBoxes || 0,
    cart: preferences.cart, 
    timeOfDay: preferences.timeOfDay || [],
    weatherPreference: preferences.weatherPreference || [],
    paceOfPlay: preferences.paceOfPlay || [],
    conversationLevel: preferences.conversationLevel || [],
    drinking: preferences.drinking || false,
    okayWithPartnerDrinking: preferences.okayWithPartnerDrinking || false,
    smoking: preferences.smoking || false,
    okayWithPartnerSmoking: preferences.okayWithPartnerSmoking || false,
    music: preferences.music || false,
    musicPreference: preferences.musicPreference || [],
    wager: preferences.wager || false,
    wagerPreference: preferences.wagerPreference || "",
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await saveUserData(
      {
        name: formData.name,
        profilePhoto: formData.profilePhoto,
        handicap: Number(formData.handicap) || undefined,
        age: Number(formData.age) || undefined,
        gender: formData.gender === "true",
        country: formData.country,
        province: formData.province,
        city: formData.city,
      },
      {
        distanceRange: Number(formData.distanceRange) || undefined,
        preferredCourses: formData.preferredCourses.split(",").map((course) => course.trim()),
        similarAge: formData.similarAge,
        sameGender: formData.sameGender,
        playWithSimilarHandicap: formData.playWithSimilarHandicap,
        teeBoxes: Number(formData.teeBoxes) || undefined,

        // Always pass an integer to saveUserData
        cart: formData.cart,

        timeOfDay: formData.timeOfDay.map(Number),
        weatherPreference: formData.weatherPreference.map(Number),
        paceOfPlay: formData.paceOfPlay.map(Number),
        conversationLevel: formData.conversationLevel.map(Number),
        drinking: formData.drinking,
        okayWithPartnerDrinking: formData.okayWithPartnerDrinking,
        smoking: formData.smoking,
        okayWithPartnerSmoking: formData.okayWithPartnerSmoking,
        music: formData.music,
        musicPreference: formData.musicPreference.map(Number),
        wager: formData.wager,
        wagerPreference: formData.wagerPreference,
      }
    );
  }

  return (
    <div className="flex justify-center">
    <form onSubmit={handleSubmit} className="mt-24 md:w-1/2 md: space-y-4 p-4 border rounded shadow-md">
      <h2 className="text-xl font-semibold">Edit Profile</h2>

      {/* User Fields */}
      <div>
        <label className="block">Name</label>
        <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2 w-full" />
      </div>

      <div>
        <label className="block">Country</label>
        <input type="text" name="country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="border p-2 w-full" />
      </div>

      <hr className="my-4" />

      {/* Preferences Fields */}
      <h3 className="text-lg font-semibold">Preferences</h3>

      <div>
        <label className="block">Distance Range</label>
        <input type="number" name="distanceRange" value={formData.distanceRange} onChange={(e) => setFormData({ ...formData, distanceRange: e.target.value })} className="border p-2 w-full" />
      </div>


      <div>
        <label className="block">Play with Similar Handicap?</label>
        <select name="playWithSimilarHandicap" value={formData.playWithSimilarHandicap ? "true" : "false"} onChange={(e) => setFormData({ ...formData, playWithSimilarHandicap: e.target.value === "true" })} className="border p-2 w-full">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div>
        <label className="block">Cart Preference</label>
        <select
          name="cart"
          value={formData.cart} // Cart is always an integer
          onChange={(e) => setFormData({ ...formData, cart: parseInt(e.target.value, 10) })} // Ensure conversion to int
          className="border p-2 w-full"
        >
          {Object.entries(CART_OPTIONS).map(([key, value]) => (
            <option key={key} value={parseInt(key, 10)}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Save Changes
      </button>
    </form>
    </div>
  );
}
