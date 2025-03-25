-- CreateTable
CREATE TABLE "OnboardingStatus" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OnboardingStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingStatus_userId_key" ON "OnboardingStatus"("userId");

-- AddForeignKey
ALTER TABLE "OnboardingStatus" ADD CONSTRAINT "OnboardingStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
