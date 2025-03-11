"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MButton from "@/app/components/misc/button";

export default function ProfileEdit() {
  const [userInfo, setUserInfo] = useState({
    image: "",
    city: "",
    province: "",
    locationRange: 0,
    hc: 0,
    favouriteCourse: "",
    gameLength: 0,
    hasCart: false,
    tees: "blue",
    isCompetitive: false,
  });

  useEffect(() => {
    async function fetchSession() {
      try {
        // TODO: Fetch user data from backend
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        if (data.user) {
          setUserInfo({
            image: data.user.image || "",
            city: data.user.city || "",
            province: data.user.province || "",
            locationRange: data.user.locationRange || 0,
            hc: data.user.hc || 0,
            favouriteCourse: data.user.favouriteCourse || "",
            gameLength: data.user.gameLength || 0,
            hasCart: data.user.hasCart || false,
            tees: data.user.tees || "blue",
            isCompetitive: data.user.isCompetitive || false,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchSession();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated User Info:", userInfo);
    // TODO: Send updated data to backend
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-4xl font-bold">Edit Profile</h1>

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
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">Province</label>
          <select
            name="province"
            value={userInfo.province}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
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
            type="number"
            name="hc"
            value={userInfo.hc}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            max="54"
          />
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
            type="number"
            name="gameLength"
            value={userInfo.gameLength}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            max="18"
            step={3}
          />
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
