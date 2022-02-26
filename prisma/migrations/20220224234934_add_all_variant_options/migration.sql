/*
  Warnings:

  - You are about to drop the column `color` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `color`,
    DROP COLUMN `size`;

-- AlterTable
ALTER TABLE `VariantOptions` ADD COLUMN `card` VARCHAR(191) NULL,
    ADD COLUMN `design` VARCHAR(191) NULL,
    ADD COLUMN `flavor` VARCHAR(191) NULL,
    ADD COLUMN `metal` VARCHAR(191) NULL,
    ADD COLUMN `saying` VARCHAR(191) NULL,
    ADD COLUMN `scent` VARCHAR(191) NULL,
    ADD COLUMN `scentSelection` VARCHAR(191) NULL,
    ADD COLUMN `skinType` VARCHAR(191) NULL,
    ADD COLUMN `style` VARCHAR(191) NULL,
    ADD COLUMN `tvShow` VARCHAR(191) NULL;
