/*
  Warnings:

  - You are about to drop the `VariantOptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `VariantOptions` DROP FOREIGN KEY `VariantOptions_productId_fkey`;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `card` VARCHAR(191) NULL,
    ADD COLUMN `color` VARCHAR(191) NULL,
    ADD COLUMN `design` VARCHAR(191) NULL,
    ADD COLUMN `flavor` VARCHAR(191) NULL,
    ADD COLUMN `metal` VARCHAR(191) NULL,
    ADD COLUMN `saying` VARCHAR(191) NULL,
    ADD COLUMN `scent` VARCHAR(191) NULL,
    ADD COLUMN `scentSelection` VARCHAR(191) NULL,
    ADD COLUMN `size` VARCHAR(191) NULL,
    ADD COLUMN `skinType` VARCHAR(191) NULL,
    ADD COLUMN `style` VARCHAR(191) NULL,
    ADD COLUMN `tvShow` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `VariantOptions`;
