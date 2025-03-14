import { useState } from "react";

export type User = {
  id: string;
  profile_photo?: string | null; // S3 path
  photo_gallery?: string[] | null; // S3 paths
  handicap?: number | null;
  age?: number | null;
  gender?: boolean | null;
  country?: string | null;
  province?: string | null;
  city?: string | null;
};

export type PreferenceSet = {
  preference_set_id: string;
  distance_range?: number | null;
  preferred_courses?: string[] | null;
  similar_age?: boolean | null;
  same_gender?: boolean | null;
  play_with_similar_handicap?: boolean | null;
  tee_boxes?: number | null; // Tips | Blue | White | Red
  cart?: number | null; // Yes | No | Doesn’t Matter
  time_of_day?: number[] | null; // Morning | Afternoon | Evening
  weather_preference?: number[] | null; // Rain | Overcast | Sunny
  pace_of_play?: number[] | null; // Slow | Normal Speed | Fast
  conversation_level?: number[] | null; // Quiet | Doesn’t matter | Chatty 
  drinking?: boolean | null;
  okay_with_partner_drinking?: boolean | null;
  smoking?: boolean | null;
  okay_with_partner_smoking?: boolean | null;
  music?: boolean | null;
  music_preference?: number[] | null; // Various genres
  wager?: boolean | null;
  wager_preference?: string | null;
};
