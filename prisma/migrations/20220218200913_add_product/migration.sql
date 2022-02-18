-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "imageLink" TEXT NOT NULL,
    "additionalImageLink" TEXT,
    "price" REAL NOT NULL,
    "salePrice" REAL,
    "salePriceEffectiveDate" REAL,
    "availability" BOOLEAN NOT NULL,
    "inventory" INTEGER NOT NULL,
    "brand" TEXT,
    "mpn" BIGINT NOT NULL,
    "groupId" TEXT,
    "itemGroupId" TEXT,
    "size" TEXT,
    "color" TEXT
);
