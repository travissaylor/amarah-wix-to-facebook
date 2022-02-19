-- CreateTable
CREATE TABLE `Wix` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `access_token` VARCHAR(191) NULL,
    `refresh_token` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `imageLink` VARCHAR(191) NOT NULL,
    `additionalImageLink` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `salePrice` DOUBLE NULL,
    `salePriceEffectiveDate` DOUBLE NULL,
    `availability` BOOLEAN NOT NULL,
    `inventory` INTEGER NOT NULL,
    `brand` VARCHAR(191) NULL,
    `mpn` BIGINT NOT NULL,
    `groupId` VARCHAR(191) NULL,
    `itemGroupId` VARCHAR(191) NULL,
    `size` VARCHAR(191) NULL,
    `color` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
