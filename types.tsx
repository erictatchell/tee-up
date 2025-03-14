import { useState } from "react";

export type Profile = {
  user_id: number;
  preference_id: number;
  name: string;
  profile_photo: string; // S3 path
  photo_gallery: string[]; // S3 paths
  handicap: number;
  age: number;
  gender: string;
  country: string;
  province_or_state: string;
  city: string;
};

export type PreferenceSet = {
  preferences_set_id: number;
  user_id: number;
  preferred_courses: string[];
  similar_age: boolean;
  same_gender: boolean;
  play_with_similar_handicap: boolean;
  tee_boxes: 0 | 1 | 2 | 3; // Tips | Blue | White | Red
  cart: 0 | 1 | 2; // Yes | No | Doesn’t Matter
  time_of_day: (0 | 1 | 2)[]; // Morning | Afternoon | Evening
  weather_preference: (0 | 1 | 2)[]; // Rain | Overcast | Sunny
  pace_of_play: 0 | 1 | 2; // Slow | Normal Speed | Fast
  conversation_level: 0 | 1 | 2; // Quiet | Doesn’t matter | Chatty
  drinking: boolean;
  okay_with_partner_drinking: boolean;
  smoking: boolean;
  okay_with_partner_smoking: boolean;
  music: boolean;
  music_preference: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19)[]; // Rock | Pop | Hip-Hop | Jazz | Classical | Country | Electronic | Reggae | Blues | Metal | Folk | R&B | Latin | Soul | Funk | Indie | Punk | K-Pop | House | Techno
  wager: boolean;
  wager_preference?: string;
};

