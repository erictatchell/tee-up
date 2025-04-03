"use client";

import { getSignedURL, addToDB } from "@/app/components/file/actions";
import UploadFile from "@/app/components/file/upload";
import { PreferenceSet, User } from "@prisma/client";
import { useState } from "react";
import Image from 'next/image'

const GENDERS = { 0: "Male", 1: "Female", 2: "Other", 3: "Prefer not to say" };
const CART_OPTIONS = { 0: "No", 1: "Yes", 2: "Doesn’t Matter" };
const TEE_BOX_OPTIONS = { 0: "Tips", 1: "Blue", 2: "White", 3: "Red" };
const TIME_OF_DAY_OPTIONS = { 0: "Morning", 1: "Afternoon", 2: "Evening" };
const WEATHER_OPTIONS = { 0: "Rain", 1: "Overcast", 2: "Sunny" };
const PACE_OF_PLAY_OPTIONS = { 0: "Slow", 1: "Normal Speed", 2: "Fast" };
const CONVERSATION_LEVEL_OPTIONS = { 0: "Quiet", 1: "Doesn’t Matter", 2: "Chatty" };
const MUSIC_PREFERENCES = { 0: "Rock", 1: "Pop", 2: "Jazz", 3: "Classical", 4: "Hip-Hop", 5: "Country" };

type EditProfileProps = {
  user: User;
  preferences: PreferenceSet | false;
  saveUserData: (user: User, preferences: PreferenceSet) => Promise<any>;
};

const EditProfile: React.FunctionComponent<EditProfileProps> = ({
  user,
  preferences,
  saveUserData,
}) => {
  const [files, setFiles] = useState<File[]>([]);


  if (preferences === false) {
    return <h1>Error: Preferences weren't found.</h1>;
  }
  const [formData, setFormData] = useState({
    name: user.name || "",
    profilePhoto: user.profilePhoto || "",
    handicap: user.handicap || "",
    age: user.age || 0,
    gender: user.gender || 0,
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

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(formData)
    await saveUserData(
      {
        ...user,
        name: formData.name,
        profilePhoto: formData.profilePhoto,
        handicap: Number(formData.handicap),
        age: Number(formData.age),
        gender: Number(formData.gender),
        country: formData.country,
        province: formData.province,
        city: formData.city,
      },
      {
        ...preferences,
        preferenceSetId: user!.preferenceSetId!,
        distanceRange: Number(formData.distanceRange),
        similarAge: formData.similarAge,
        sameGender: formData.sameGender,
        playWithSimilarHandicap: formData.playWithSimilarHandicap,
        teeBoxes: Number(formData.teeBoxes),
        cart: Number(formData.cart),
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
        // Convert the comma-separated string to an array of strings
        preferredCourses: formData.preferredCourses
          .split(",")
          .map((course) => course.trim())
          .filter((course) => course !== ""),
      }


    );

    await handleFiles(files)
  }


  const handleFiles = async (files: File[]) => {
    if (!files || files.length === 0) {
      return;
    }
    const uploadPromises = files.map(async (file: File) => {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });
      console.log(response)

      if (response.ok) {
        const { url, fields } = await response.json();
        const signedURL = await getSignedURL({
          fileType: file.type,
          fileSize: file.size,
          key: fields.key,
          userId: user.id
        });


        addToDB(user.id,
          signedURL.success!.url.split("?")[0],
        );




        // addToDB(file.name, DocumentID, "", [
        //   signedURL.success!.url.split("?")[0],
        // ]);

        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        formData.append("file", file);

        return fetch(url, {
          method: "POST",
          body: formData,
        });
      } else {
        console.error("Failed to get pre-signed URL.");
        return null;
      }
    });

    const uploadResponses = await Promise.all(uploadPromises);

    uploadResponses.forEach((uploadResponse: any) => {
      if (uploadResponse && uploadResponse.ok) {
      } else {
        console.error("S3 Upload Error:", uploadResponse);
        alert("Upload failed.");
      }
    });
  };



  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <div className="mt-24 w-1/2 space-y-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
            <Image
              src={user.profilePhoto || "/images/empty_profile.png"}
              width={160}
              height={160}
              alt={user.name || "Profile image"}
              className="object-cover w-full h-full"
            />
          </div>
          {/* User Fields */}
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Age", name: "age", type: "number" },
            { label: "Country", name: "country", type: "text" },
            { label: "Province", name: "province", type: "text" },
            { label: "City", name: "city", type: "text" },
            { label: "Handicap", name: "handicap", type: "number" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label>{label}</label>
              <input
                type={type}
                value={(formData as any)[name]}
                onChange={(e) =>
                  setFormData({ ...formData, [name]: e.target.value })
                }
                className="border p-2 w-full"
              />
            </div>
          ))}

          {/* Gender (Horizontal Radio Buttons) */}
          <div className="my-4">
            <label className="block mb-2 font-medium">Gender</label>
            <div className="flex space-x-4">
              {Object.entries(GENDERS).map(([key, value]) => (
                <label key={key} className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={key}
                    checked={String(formData.gender) === key}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: Number(e.target.value) })
                    }
                    className="form-radio h-4 w-4 text-blue-500"
                  />
                  <span className="ml-2">{value}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="my-4" />

          {/* Preferences Section */}
          <h3 className="text-lg font-semibold">Preferences</h3>

          <div>
            <label className="block mb-2 font-medium">
              Distance Range ({formData.distanceRange} km)
            </label>
            <input
              type="range"
              min="50"
              max="200"
              value={formData.distanceRange}
              onChange={(e) =>
                setFormData({ ...formData, distanceRange: Number(e.target.value) })
              }
              className="w-full"
            />
          </div>

          {/* Single-select Dropdowns */}
          {[
            { label: "Tee Boxes", name: "teeBoxes", options: TEE_BOX_OPTIONS },
            { label: "Cart Preference", name: "cart", options: CART_OPTIONS },
          ].map(({ label, name, options }) => (
            <div key={name}>
              <label>{label}</label>
              <select
                value={(formData as any)[name]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [name]:
                      e.target.value !== "" ? Number(e.target.value) : "",
                  })
                }
                className="border p-2 w-full rounded"
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
              <select
                multiple
                value={(formData as any)[name]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [name]: Array.from(e.target.selectedOptions, (opt) =>
                      Number(opt.value)
                    ),
                  })
                }
                className="border p-2 w-full rounded"
              >
                {Object.entries(options).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Boolean Checkboxes */}
          {[
            "similarAge",
            "sameGender",
            "playWithSimilarHandicap",
            "drinking",
            "okayWithPartnerDrinking",
            "smoking",
            "okayWithPartnerSmoking",
            "music",
          ].map((name) => (
            <div key={name}>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={(formData as any)[name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [name]: e.target.checked })
                  }
                  className="mr-2"
                />
                {name.replace(/([A-Z])/g, " $1").replace(/^./, (str) =>
                  str.toUpperCase()
                )}
                ?
              </label>
            </div>
          ))}

          <div className="grid border-t border-gray-500 pt-6">
            <UploadFile
              files={files}
              documentID={0}
              description={""}
              setFiles={setFiles}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Save Changes
          </button>

        </div>
      </div>
    </form>
  );
};

export default EditProfile;