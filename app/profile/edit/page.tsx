import { auth } from "@/auth";
import { prisma } from "@/prisma";
import EditProfile from "./edit-profile";


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

  if (!user.preferenceSet) {
    const preferenceSet = await prisma.preferenceSet.create({
      data: {
        distanceRange: null,
        preferredCourses: [],
        similarAge: null,
        sameGender: null,
        playWithSimilarHandicap: null,
        teeBoxes: null,
        cart: null,
        timeOfDay: [],
        weatherPreference: [],
        paceOfPlay: [],
        conversationLevel: [],
        drinking: null,
        okayWithPartnerDrinking: null,
        smoking: null,
        okayWithPartnerSmoking: null,
        music: null,
        musicPreference: [],
        wager: null,
        wagerPreference: null,
        User: { connect: { id: user.id } },
      },
    });

    user = { ...user, preferenceSet };
  }


async function saveUserData(
    updatedUser: Partial<typeof user>,
    updatedPreferences: Partial<typeof user.preferenceSet>
  ) {
    "use server"; 

    return await prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        ...updatedUser,
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
