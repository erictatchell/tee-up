import { auth } from "@/auth";
import { prisma } from "@/prisma";
import EditProfile from "./edit-profile";
import { PreferenceSet, User } from "@prisma/client";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <p>You must be signed in to view this page.</p>;
  }

  let user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { preferenceSet: true },
  });

  if (!user) {
    return <p>User not found.</p>;
  }

  let preferenceSet: PreferenceSet;

  // If the user doesn't have a preferenceSet, create one and update the user record
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

    // Connect the newly created preferenceSet to the user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        preferenceSet: { connect: { preferenceSetId: preferenceSet.preferenceSetId } },
      },
    });
  } else {
    // If the user already has a preferenceSet, use it
    preferenceSet = user.preferenceSet;
  }

  async function saveUserData(
    updatedUser: User,
    updatedPreferences: PreferenceSet
  ) {
    "use server";
    if (!updatedUser) {
      return;
    }
    return await prisma.user.update({
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
          update: { ...updatedPreferences },
        },
      },
    });
  }

  return <EditProfile saveUserData={saveUserData} user={user} preferences={preferenceSet} />;
}
