/*
  Warnings:

  - You are about to drop the column `groupId` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `salePriceEffectiveDate` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Products` DROP COLUMN `groupId`,
    DROP COLUMN `salePriceEffectiveDate`;
