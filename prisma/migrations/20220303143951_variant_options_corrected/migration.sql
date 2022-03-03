/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `VariantOptions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `VariantOptions_productId_key` ON `VariantOptions`(`productId`);
