-- AlterTable
ALTER TABLE "User" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "age" SET DEFAULT 0,
ALTER COLUMN "city" SET DEFAULT '',
ALTER COLUMN "country" SET DEFAULT '',
ALTER COLUMN "handicap" SET DEFAULT 0,
ALTER COLUMN "photoGallery" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "province" SET DEFAULT '',
ALTER COLUMN "gender" SET DEFAULT 0;
