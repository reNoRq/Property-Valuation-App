/*
  Warnings:

  - Added the required column `address` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "category" INTEGER NOT NULL,
ADD COLUMN     "lat" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "lng" DECIMAL(65,30) NOT NULL;
