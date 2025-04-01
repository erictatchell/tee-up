import { auth } from "@/auth";
import { prisma } from "@/prisma";
import EditProfile from "../profile/edit/edit-profile";
import { PreferenceSet, User } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <p>You must be signed in to onboard.</p>;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { preferenceSet: true },
  });

  if (!user) {
    return <p>User not found.</p>;
  }

  let preferenceSet: PreferenceSet;

  if (!user.preferenceSet) {
    preferenceSet = await prisma.preferenceSet.create({
      data: {
        distanceRange: 0,
        preferredCourses: [],
        similarAge: false,
        sameGender: false,
        playWithSimilarHandicap: false,
        teeBoxes: 0,
        cart: 0,
        timeOfDay: [],
        weatherPreference: [],
        paceOfPlay: [],
        conversationLevel: [],
        drinking: false,
        okayWithPartnerDrinking: false,
        smoking: false,
        okayWithPartnerSmoking: false,
        music: false,
        musicPreference: [],
        wager: false,
        wagerPreference: "",
        User: { connect: { id: user.id } },
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        preferenceSet: { connect: { preferenceSetId: preferenceSet.preferenceSetId } },
      },
    });
  } else {
    preferenceSet = user.preferenceSet;
  }



  async function saveUserData(updatedUser: User, updatedPreferences: PreferenceSet) {
    "use server";

    const { preferenceSetId, ...preferenceUpdateData } = updatedPreferences;

    await prisma.user.update({
      where: { id: updatedUser.id },
      data: {
        name: updatedUser.name,
        email: updatedUser.email,
        profilePhoto: updatedUser.profilePhoto,
        handicap: updatedUser.handicap,
        age: updatedUser.age,
        gender: updatedUser.gender,
        country: updatedUser.country,
        province: updatedUser.province,
        city: updatedUser.city,
        preferenceSet: {
          update: preferenceUpdateData, 
        },
      },
    });

    // Mark user as onboarded
    await prisma.onboardingStatus.create({
      data: {
        user: { connect: { id: updatedUser.id } },
      },
    });

    // Redirect to main page after onboarding
    redirect("/profile");
  }

  return <EditProfile saveUserData={saveUserData} user={user} preferences={preferenceSet} />;
}
