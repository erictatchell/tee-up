"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MButton from "@/app/components/misc/button";

export default function ProfileEdit() {

  const [savemessage, setsavemessage] = usestate(""); // state for success message

  useeffect(() => {
    async function fetchsession() {
      try {
        // todo: fetch user data from backend
        const res = await fetch("/api/user");
        if (!res.ok) throw new error("failed to fetch user data");

        const data = await res.json();
        if (data.user) {
          setuserinfo({
            image: data.user.image || "",
            city: data.user.city || "",
            province: data.user.province || "",
            locationrange: data.user.locationrange || 0,
            hc: data.user.hc || 0,
            favouritecourse: data.user.favouritecourse || "",
            gamelength: data.user.gamelength || 0,
            hascart: data.user.hascart || false,
            tees: data.user.tees || "blue",
            iscompetitive: data.user.iscompetitive || false,
          });
        }
      } catch (error) {
        console.error("error fetching user data:", error);
      }
    }

    fetchsession();
  }, []);

  const handlechange = (e: react.changeevent<htmlinputelement | htmlselectelement>) => {
    const { name, value, type } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    // TODO: Send updated user data to backend
    // try {
    //   if (!res.ok) throw new Error("Failed to update profile");
    //   setSaveMessage("Profile saved successfully!"); // Show success message
    //   setTimeout(() => setSaveMessage(""), 3000); // Clear message after 3 seconds
    // } catch (error) {
    //   console.error("Error updating profile:", error);
    //   setSaveMessage("Failed to save profile."); // Show error message
    //   setTimeout(() => setSaveMessage(""), 3000);
    // }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 pt-20">
      <h1 className="text-4xl font-bold mb-6">Edit Profile</h1>
      {saveMessage && (
        <div className="bg-green-100 text-green-800 p-2 rounded-md mb-4 text-center w-full max-w-lg">
          {saveMessage}
        </div>
      )}
      <div className="relative w-32 h-32">
        <Image
          src={userInfo.image || "/images/empty_profile.png"}
          alt="Profile"
          width={200}
          height={200}
          className="rounded-full object-cover border"
        />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
        <div className="flex flex-col gap-2">
          <label className="text-lg">City</label>
          <input
            type="text"
            name="city"
            value={userInfo.city}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">Province</label>
          <select
            name="province"
            value={userInfo.province}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Province</option>
            <option value="AB">Alberta</option>
            <option value="BC">British Columbia</option>
            <option value="MB">Manitoba</option>
            <option value="NB">New Brunswick</option>
            <option value="NL">Newfoundland and Labrador</option>
            <option value="NS">Nova Scotia</option>
            <option value="ON">Ontario</option>
            <option value="PE">Prince Edward Island</option>
            <option value="QC">Quebec</option>
            <option value="SK">Saskatchewan</option>
            <option value="NT">Northwest Territories</option>
            <option value="NU">Nunavut</option>
            <option value="YT">Yukon</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">Handicap</label>
          <input
            type="range"
            name="hc"
            value={userInfo.hc}
            onChange={handleChange}
            className="w-full"
            min="0"
            max="54"
            step="1"
          />
          <span>{userInfo.hc}</span>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">Favourite Course</label>
          <input
            type="text"
            name="favouriteCourse"
            value={userInfo.favouriteCourse}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">Game Length</label>
          <input
            type="range"
            name="gameLength"
            value={userInfo.gameLength}
            onChange={handleChange}
            className="w-full"
            min="0"
            max="18"
            step="3"
            required
          />
          <span>{userInfo.gameLength} holes</span>
        </div>
        <div className="block flex gap-2">
          <label className="text-lg">Cart</label>
          <input
            type="checkbox"
            name="hasCart"
            checked={userInfo.hasCart}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">Tees</label>
          <input
            type="text"
            name="tees"
            value={userInfo.tees}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="block flex gap-2">
          <label className="text-lg">Competitive</label>
          <input
            type="checkbox"
            name="isCompetitive"
            checked={userInfo.isCompetitive}
            onChange={handleChange}
          />
        </div>
        <MButton link={"/profile/edit"} text={"Save Profile"} submit={true}></MButton>
      </form>
    </div>
  );
}
