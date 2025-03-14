/*
  Warnings:

  - Made the column `distanceRange` on table `PreferenceSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `similarAge` on table `PreferenceSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sameGender` on table `PreferenceSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `playWithSimilarHandicap` on table `PreferenceSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teeBoxes` on table `PreferenceSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cart` on table `PreferenceSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `drinking` on table `PreferenceSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `okayWithPartnerDrinking` on table `PreferenceSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `smoking` on table `PreferenceSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `okayWithPartnerSmoking` on table `PreferenceSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `music` on table `PreferenceSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wager` on table `PreferenceSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wagerPreference` on table `PreferenceSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `age` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `handicap` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `province` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PreferenceSet" ALTER COLUMN "distanceRange" SET NOT NULL,
ALTER COLUMN "similarAge" SET NOT NULL,
ALTER COLUMN "sameGender" SET NOT NULL,
ALTER COLUMN "playWithSimilarHandicap" SET NOT NULL,
ALTER COLUMN "teeBoxes" SET NOT NULL,
ALTER COLUMN "cart" SET NOT NULL,
ALTER COLUMN "drinking" SET NOT NULL,
ALTER COLUMN "okayWithPartnerDrinking" SET NOT NULL,
ALTER COLUMN "smoking" SET NOT NULL,
ALTER COLUMN "okayWithPartnerSmoking" SET NOT NULL,
ALTER COLUMN "music" SET NOT NULL,
ALTER COLUMN "wager" SET NOT NULL,
ALTER COLUMN "wagerPreference" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "age" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "handicap" SET NOT NULL,
ALTER COLUMN "province" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL;
