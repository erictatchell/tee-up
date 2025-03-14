/*
  Warnings:

  - A unique constraint covering the columns `[preferenceSetId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "gender" BOOLEAN,
ADD COLUMN     "handicap" DOUBLE PRECISION,
ADD COLUMN     "photoGallery" TEXT[],
ADD COLUMN     "preferenceSetId" TEXT,
ADD COLUMN     "profilePhoto" TEXT,
ADD COLUMN     "province" TEXT;

-- CreateTable
CREATE TABLE "PreferenceSet" (
    "preferenceSetId" TEXT NOT NULL,
    "distanceRange" DOUBLE PRECISION,
    "preferredCourses" TEXT[],
    "similarAge" BOOLEAN,
    "sameGender" BOOLEAN,
    "playWithSimilarHandicap" BOOLEAN,
    "teeBoxes" INTEGER,
    "cart" INTEGER,
    "timeOfDay" INTEGER[],
    "weatherPreference" INTEGER[],
    "paceOfPlay" INTEGER[],
    "conversationLevel" INTEGER[],
    "drinking" BOOLEAN,
    "okayWithPartnerDrinking" BOOLEAN,
    "smoking" BOOLEAN,
    "okayWithPartnerSmoking" BOOLEAN,
    "music" BOOLEAN,
    "musicPreference" INTEGER[],
    "wager" BOOLEAN,
    "wagerPreference" TEXT,

    CONSTRAINT "PreferenceSet_pkey" PRIMARY KEY ("preferenceSetId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_preferenceSetId_key" ON "User"("preferenceSetId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_preferenceSetId_fkey" FOREIGN KEY ("preferenceSetId") REFERENCES "PreferenceSet"("preferenceSetId") ON DELETE SET NULL ON UPDATE CASCADE;
