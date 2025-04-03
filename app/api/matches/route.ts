import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

// Scoring thresholds
const AGE_TOLERANCE = 5;
const HANDICAP_TOLERANCE = 3;

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json([], { status: 401 });

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { preferenceSet: true },
  });

  if (!currentUser || !currentUser.preferenceSet) {
    return NextResponse.json([], { status: 404 });
  }

  const others = await prisma.user.findMany({
    where: { id: { not: currentUser.id } },
    include: { preferenceSet: true },
  });

  const scoredUsers = others.map((otherUser) => {
    const pref = otherUser.preferenceSet;
    const score = getMatchScore(currentUser, otherUser);
    return { user: otherUser, score };
  });

  // Sort from highest score to lowest
  scoredUsers.sort((a, b) => b.score - a.score);

  return NextResponse.json(scoredUsers);
}

function getMatchScore(current: any, other: any): number {
  const a = current;
  const b = other;

  let score = 0;
  const ap = a.preferenceSet;
  const bp = b.preferenceSet;

  if (a.city && b.city && a.city === b.city) score++;
  if (ap.similarAge && Math.abs(a.age - b.age) <= AGE_TOLERANCE) score++;
  if (ap.sameGender && a.gender === b.gender) score++;
  if (ap.playWithSimilarHandicap && Math.abs(a.handicap - b.handicap) <= HANDICAP_TOLERANCE) score++;
  if (ap.teeBoxes === bp.teeBoxes) score++;
  if (ap.cart === bp.cart) score++;
  if (arrayIntersect(ap.timeOfDay, bp.timeOfDay)) score++;
  if (arrayIntersect(ap.weatherPreference, bp.weatherPreference)) score++;
  if (arrayIntersect(ap.paceOfPlay, bp.paceOfPlay)) score++;
  if (arrayIntersect(ap.conversationLevel, bp.conversationLevel)) score++;
  if (ap.drinking === bp.drinking) score++;
  if (ap.okayWithPartnerDrinking === bp.drinking) score++;
  if (ap.smoking === bp.smoking) score++;
  if (ap.okayWithPartnerSmoking === bp.smoking) score++;
  if (ap.music === bp.music) score++;
  if (arrayIntersect(ap.musicPreference, bp.musicPreference)) score++;
  if (ap.wager === bp.wager) score++;
  if (ap.wagerPreference === bp.wagerPreference) score++;
  if (arrayIntersect(ap.preferredCourses, bp.preferredCourses)) score++;

  return score;
}

function arrayIntersect(arr1: any[], arr2: any[]) {
  if (!arr1 || !arr2) return false;
  return arr1.some((v) => arr2.includes(v));
}