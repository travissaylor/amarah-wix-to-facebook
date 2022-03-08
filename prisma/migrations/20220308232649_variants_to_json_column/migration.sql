/*
  Warnings:

  - You are about to drop the column `card` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `design` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `flavor` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `metal` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `saying` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `scent` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `scentSelection` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `skinType` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `style` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `tvShow` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Products` DROP COLUMN `card`,
    DROP COLUMN `design`,
    DROP COLUMN `flavor`,
    DROP COLUMN `metal`,
    DROP COLUMN `saying`,
    DROP COLUMN `scent`,
    DROP COLUMN `scentSelection`,
    DROP COLUMN `skinType`,
    DROP COLUMN `style`,
    DROP COLUMN `tvShow`,
    ADD COLUMN `additionalVariantAttributes` JSON NULL;
