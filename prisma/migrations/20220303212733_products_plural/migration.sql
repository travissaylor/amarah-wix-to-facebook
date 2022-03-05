/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Product`;

-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pid` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `imageLink` VARCHAR(191) NOT NULL,
    `additionalImageLink` VARCHAR(191) NULL,
    `price` VARCHAR(191) NOT NULL,
    `salePrice` VARCHAR(191) NULL,
    `salePriceEffectiveDate` VARCHAR(191) NULL,
    `availability` BOOLEAN NOT NULL,
    `inventory` INTEGER NULL,
    `brand` VARCHAR(191) NULL,
    `mpn` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NULL,
    `itemGroupId` VARCHAR(191) NULL,
    `size` VARCHAR(191) NULL,
    `color` VARCHAR(191) NULL,
    `saying` VARCHAR(191) NULL,
    `design` VARCHAR(191) NULL,
    `metal` VARCHAR(191) NULL,
    `scent` VARCHAR(191) NULL,
    `style` VARCHAR(191) NULL,
    `flavor` VARCHAR(191) NULL,
    `card` VARCHAR(191) NULL,
    `tvShow` VARCHAR(191) NULL,
    `scentSelection` VARCHAR(191) NULL,
    `skinType` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
