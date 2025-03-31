import Image from "next/image";
import { auth } from "@/auth";

import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

import NavClient from "@/nav-client";
import MButton from "../components/misc/Button";

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
  return (
    <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      {/* Main Section - Full Screen */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 text-center">
        <Image
          src="/images/empty_profile.png"
          alt="empty profile pic"
          width={200}
          height={200}
        />
        <label>{userInfo.name}</label>
        <label>{userInfo.email}</label>
        <NavClient name={userInfo.name} />
        <MButton link="/profile/edit" text="Edit Profile" />
        <MButton link="/profile/filters" text="Edit Filters" />
      </main>
    </div>
  );
}
