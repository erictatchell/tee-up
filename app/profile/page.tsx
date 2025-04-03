import Image from "next/image";
import { auth } from "@/auth";

import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

import NavClient from "@/nav-client";
import MButton from "../components/misc/MButton";

export default async function Profile() {
  const session = await auth();
  const user = session?.user;

  console.log("Session:", session);

  if (!user?.id) {
    redirect("/");
  }

  const onboardingStatus = await prisma.onboardingStatus.findUnique({
    where: { userId: user.id },
  });

  if (!onboardingStatus) {
    redirect("/onboarding");
  }

  const userInfo = {
    name: user?.name || "",
    email: user?.email || "",
    image: user?.image || ""
  };
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  })
  let userImage: string | null | undefined = dbUser?.profilePhoto;
  if (!userImage) {
    userImage = '/images/empty_profile.png'
  }
  return (
    <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      {/* Main Section - Full Screen */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 text-center">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-md">
          <Image
            src={userImage}
            alt={userInfo.name || "Profile photo"}
            width={192}
            height={192}
            className="object-cover w-full h-full"
          />
        </div>

        <label>{userInfo.name}</label>
        <label>{userInfo.email}</label>
        <NavClient name={userInfo.name} />
        <MButton link="/profile/edit" text="Edit Profile" />
        <MButton link="/queue" text="Find a Match" />
      </main>
    </div>
  );
}
