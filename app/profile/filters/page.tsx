"use client";

import { useState, useEffect } from "react";
import { Range } from "react-range";
import MButton from "@/app/components/misc/button";

export default function ProfileFilters() {

  const [userInfo, setUserInfo] = useState({
    filterAgeRange: [18, 100],
    filterCity: "",
    filterProvince: "",
    filterLocationRange: 0,
    filterHcRange: [0, 54],
    filterGameLengthRange: [3, 18],
    filterPlaysCasually: false,
    filterPlaysCompetitively: false,
  });

  const [saveMessage, setSaveMessage] = useState(""); // State for success message

  useEffect(() => {
    async function fetchFilters() {
      try {
        const res = await fetch("/api/get-filters");
        if (!res.ok) throw new Error("Failed to load filters");

        const data = await res.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    }

    fetchFilters();
  }, []);

  if (!userInfo) return <p>Loading...</p>;

  const handleRangeChange = (field: string, values: number[]) => {
    setUserInfo((prev) => ({ ...prev, [field]: values }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Update filters in the backend instead of local JSON data
    try {
      const res = await fetch("/api/update-filters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      if (!res.ok) throw new Error("Failed to update filters");

      setSaveMessage("Filters saved successfully!"); // Show success message
      setTimeout(() => setSaveMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error("Error updating filters:", error);
      setSaveMessage("Failed to save filters."); // Show error message
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 pt-20">
      <h1 className="text-4xl font-bold mb-6">Filter Profiles</h1>
      {saveMessage && (
        <div className="bg-green-100 text-green-800 p-2 rounded-md mb-4 text-center w-full max-w-lg">
          {saveMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
        {/* Age Range */}
        <div className="flex flex-col gap-2">
          <label className="text-lg">Age Range</label>
          <Range
            step={1}
            min={18}
            max={100}
            values={userInfo.filterAgeRange}
            onChange={(values) => handleRangeChange("filterAgeRange", values)}
            renderTrack={({ props, children }) => (
              <div {...props} className="h-2 bg-gray-300 rounded-md relative w-full">
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div {...props} className="w-5 h-5 bg-blue-500 rounded-full cursor-pointer" />
            )}
          />
          <div className="flex justify-between text-sm">
            <span>{userInfo.filterAgeRange[0]} years</span>
            <span>{userInfo.filterAgeRange[1]} years</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">Filter City</label>
          <input
            type="text"
            name="filterCity"
            value={userInfo.filterCity}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">Filter Province</label>
          <select
            name="filterProvince"
            value={userInfo.filterProvince}
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
          <label className="text-lg">Filter Location Range from City (km)</label>
          <input
            type="range"
            name="filterLocationRange"
            value={userInfo.filterLocationRange}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            min="5"
            max="50"
            step="1"
          />
          <div className="flex justify-between text-sm">
            <span>{userInfo.filterLocationRange} km</span>
          </div>
        </div>
        {/* Handicap Range */}
        <div className="flex flex-col gap-2">
          <label className="text-lg">Handicap Range</label>
          <Range
            step={1}
            min={0}
            max={54}
            values={userInfo.filterHcRange}
            onChange={(values) => handleRangeChange("filterHcRange", values)}
            renderTrack={({ props, children }) => (
              <div {...props} className="h-2 bg-gray-300 rounded-md relative w-full">
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div {...props} className="w-5 h-5 bg-blue-500 rounded-full cursor-pointer" />
            )}
          />
          <div className="flex justify-between text-sm">
            <span>{userInfo.filterHcRange[0]} HC</span>
            <span>{userInfo.filterHcRange[1]} HC</span>
          </div>
        </div>
        {/* Game Length Range */}
        <div className="flex flex-col gap-2">
          <label className="text-lg">Game Length Range</label>
          <Range
            step={1}
            min={3}
            max={18}
            values={userInfo.filterGameLengthRange}
            onChange={(values) => handleRangeChange("filterGameLengthRange", values)}
            renderTrack={({ props, children }) => (
              <div {...props} className="h-2 bg-gray-300 rounded-md relative w-full">
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div {...props} className="w-5 h-5 bg-blue-500 rounded-full cursor-pointer" />
            )}
          />
          <div className="flex justify-between text-sm">
            <span>{userInfo.filterGameLengthRange[0]} holes</span>
            <span>{userInfo.filterGameLengthRange[1]} holes</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">Player Type</label>
          <div className="flex gap-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="playerType"
                value="casual"
                checked={userInfo.filterPlaysCasually && !userInfo.filterPlaysCompetitively}
                onChange={() => setUserInfo({ ...userInfo, filterPlaysCasually: true, filterPlaysCompetitively: false })}
                className="mr-2"
              />
              Casual
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="playerType"
                value="competitive"
                checked={!userInfo.filterPlaysCasually && userInfo.filterPlaysCompetitively}
                onChange={() => setUserInfo({ ...userInfo, filterPlaysCasually: false, filterPlaysCompetitively: true })}
                className="mr-2"
              />
              Competitive
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="playerType"
                value="both"
                checked={userInfo.filterPlaysCasually && userInfo.filterPlaysCompetitively}
                onChange={() => setUserInfo({ ...userInfo, filterPlaysCasually: true, filterPlaysCompetitively: true })}
                className="mr-2"
              />
              Both
            </label>
          </div>
        </div>
        <MButton link={"/profile/edit"} text={"Save Profile"} submit={true}></MButton>
      </form>
    </div>
  );
}
