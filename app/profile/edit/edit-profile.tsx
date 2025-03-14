"use client";

import { useState } from "react";

// Define mappings for dropdown options
const CART_OPTIONS = { 0: "No", 1: "Yes", 2: "Doesn’t Matter" };
const TEE_BOX_OPTIONS = { 0: "Tips", 1: "Blue", 2: "White", 3: "Red" };
const TIME_OF_DAY_OPTIONS = { 0: "Morning", 1: "Afternoon", 2: "Evening" };
const WEATHER_OPTIONS = { 0: "Rain", 1: "Overcast", 2: "Sunny" };
const PACE_OF_PLAY_OPTIONS = { 0: "Slow", 1: "Normal Speed", 2: "Fast" };
const CONVERSATION_LEVEL_OPTIONS = { 0: "Quiet", 1: "Doesn’t Matter", 2: "Chatty" };
const MUSIC_PREFERENCES = { 0: "Rock", 1: "Pop", 2: "Jazz", 3: "Classical", 4: "Hip-Hop", 5: "Country" };

export default function EditProfile({ user, preferences, saveUserData }) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    profilePhoto: user.profilePhoto || "",
    handicap: user.handicap || "",
    age: user.age || "",
    gender: user.gender || "",
    country: user.country || "",
    province: user.province || "",
    city: user.city || "",

    distanceRange: preferences.distanceRange || 50,
    preferredCourses: preferences.preferredCourses?.join(", ") || "",
    similarAge: preferences.similarAge || false,
    sameGender: preferences.sameGender || false,
    playWithSimilarHandicap: preferences.playWithSimilarHandicap || false,
    teeBoxes: preferences.teeBoxes ?? "",
    cart: preferences.cart ?? "",
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

  async function handleSubmit(event) {
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
        distanceRange: Number(formData.distanceRange),
        preferredCourses: formData.preferredCourses.split(",").map((course) => course.trim()),
        similarAge: formData.similarAge,
        sameGender: formData.sameGender,
        playWithSimilarHandicap: formData.playWithSimilarHandicap,
        teeBoxes: formData.teeBoxes !== "" ? Number(formData.teeBoxes) : undefined,
        cart: formData.cart !== "" ? Number(formData.cart) : undefined,
        timeOfDay: formData.timeOfDay.map(Number),
        weatherPreference: formData.weatherPreference.map(Number),
        //paceOfPlay: formData.paceOfPlay !== "" ? Number(formData.paceOfPlay) : undefined,
        paceOfPlay: formData.paceOfPlay.map(Number),
        //conversationLevel: formData.conversationLevel !== "" ? Number(formData.conversationLevel) : undefined,
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
      <form onSubmit={handleSubmit} className="mt-24 md:w-1/2 space-y-4 p-4 border rounded shadow-md">
        <h2 className="text-xl font-semibold">Edit Profile</h2>

        {/* User Fields */}
        <div><label>Name</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2 w-full" /></div>

        <hr className="my-4" />

        {/* Preferences */}
        <h3 className="text-lg font-semibold">Preferences</h3>

        <div>
          <label>Distance Range ({formData.distanceRange} km)</label>
          <input type="range" min="1" max="100" value={formData.distanceRange} onChange={(e) => setFormData({ ...formData, distanceRange: Number(e.target.value) })} className="w-full" />
        </div>

        {/* Dropdowns for single-select values */}
{[
  { label: "Tee Boxes", name: "teeBoxes", options: TEE_BOX_OPTIONS },
  { label: "Cart Preference", name: "cart", options: CART_OPTIONS },
].map(({ label, name, options }) => (
  <div key={name}>
    <label>{label}</label>
    <select
      value={formData[name] !== undefined ? String(formData[name]) : ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          [name]: e.target.value !== "" ? Number(e.target.value) : undefined,
        })
      }
      className="border p-2 w-full"
    >
      <option value="">Select</option>
      {Object.entries(options).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </select>
  </div>
))}

        {/* Multi-selects */}
        {[
          { label: "Time of Day", name: "timeOfDay", options: TIME_OF_DAY_OPTIONS },
          { label: "Weather Preferences", name: "weatherPreference", options: WEATHER_OPTIONS },
          { label: "Music Preferences", name: "musicPreference", options: MUSIC_PREFERENCES },
          { label: "Pace of Play", name: "paceOfPlay", options: PACE_OF_PLAY_OPTIONS },
          { label: "Conversation Level", name: "conversationLevel", options: CONVERSATION_LEVEL_OPTIONS },
        ].map(({ label, name, options }) => (
          <div key={name}>
            <label>{label}</label>
            <select multiple value={formData[name].map(String)} onChange={(e) => setFormData({ ...formData, [name]: Array.from(e.target.selectedOptions, (opt) => Number(opt.value)) })} className="border p-2 w-full">
              {Object.entries(options).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
            </select>
          </div>
        ))}

        {/* Boolean Checkboxes */}
        {[
          { label: "Prefer Similar Age?", name: "similarAge" },
          { label: "Prefer Same Gender?", name: "sameGender" },
          { label: "Play with Similar Handicap?", name: "playWithSimilarHandicap" },
          { label: "Drinking Allowed?", name: "drinking" },
          { label: "Okay with Partner Drinking?", name: "okayWithPartnerDrinking" },
          { label: "Smoking Allowed?", name: "smoking" },
          { label: "Okay with Partner Smoking?", name: "okayWithPartnerSmoking" },
          { label: "Listen to Music?", name: "music" },
          { label: "Wager on Games?", name: "wager" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label>
              <input type="checkbox" checked={formData[name]} onChange={(e) => setFormData({ ...formData, [name]: e.target.checked })} className="mr-2" />
              {label}
            </label>
          </div>
        ))}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Save Changes</button>
      </form>
    </div>
  );
}
