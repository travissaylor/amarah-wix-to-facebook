-- AlterTable
ALTER TABLE `Product` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Wix` MODIFY `access_token` TEXT NULL,
    MODIFY `refresh_token` TEXT NULL;
