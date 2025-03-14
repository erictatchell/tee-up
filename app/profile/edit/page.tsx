import { auth } from "@/auth";
import { prisma } from "@/prisma";
import EditProfile from "./edit-profile";
import { PreferenceSet, User } from "@prisma/client";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <p>You must be signed in to view this page.</p>;
  }

  let user: User | null = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { preferenceSet: true },
  });

  if (!user) {
    return <p>User not found.</p>;
  }

  let preferenceSet: PreferenceSet;
  if (!user.preferenceSetId) {
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
        wagerPreference: ,
        User: { connect: { id: user.id } },
      },
    });

    user = { ...user, preferenceSet };
  }


async function saveUserData(
    updatedUser: User,
    updatedPreferences: PreferenceSet
  ) {
    "use server"; 
    if (!user) {
      return;
    }

    return await prisma.user.update({
      where: { id: user.id },
      data: {
        ...updatedUser,
        email: updatedUser.email,
        preferenceSet: user.preferenceSet
          ? {
              update: { ...updatedPreferences },
            }
          : {
              create: { ...updatedPreferences },
            }
      }
    });
  }

  const safePreferences = {
    ...user.preferenceSet,
    distanceRange: user.preferenceSet?.distanceRange ?? "",
    similarAge: user.preferenceSet?.similarAge ?? "",
    sameGender: user.preferenceSet?.sameGender ?? "",
    playWithSimilarHandicap: user.preferenceSet?.playWithSimilarHandicap ?? "",
    teeBoxes: user.preferenceSet?.teeBoxes ?? "",
    cart: user.preferenceSet?.cart ?? "",
    drinking: user.preferenceSet?.drinking ?? "",
    okayWithPartnerDrinking: user.preferenceSet?.okayWithPartnerDrinking ?? "",
    smoking: user.preferenceSet?.smoking ?? "",
    okayWithPartnerSmoking: user.preferenceSet?.okayWithPartnerSmoking ?? "",
    music: user.preferenceSet?.music ?? "",
    wager: user.preferenceSet?.wager ?? "",
    wagerPreference: user.preferenceSet?.wagerPreference ?? "",
  };

  return <EditProfile saveUserData={saveUserData} user={user} preferences={safePreferences} />;
}
