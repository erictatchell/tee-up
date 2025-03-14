import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { prisma } from "@/prisma"



async function upsertPreferenceSet(userId: string) {
  return await prisma.preferenceSet.upsert({
    where: { userId },
    update: {}, // If exists, don't modify (could be customized if needed)
    create: {
      userId,
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
    },
  });
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub,
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page

      return !!auth;
    },
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
});
