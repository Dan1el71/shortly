-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "username" TEXT,
    "image" TEXT,
    "userAcountId" TEXT NOT NULL,
    CONSTRAINT "User_userAcountId_fkey" FOREIGN KEY ("userAcountId") REFERENCES "Account" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Account" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,
    "provider" TEXT,
    "providerAccountId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Url" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "AuthorId" TEXT NOT NULL,
    CONSTRAINT "Url_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User" ("uuid") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" INTEGER NOT NULL,
    CONSTRAINT "Visit_url_fkey" FOREIGN KEY ("url") REFERENCES "Url" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_userAcountId_key" ON "User"("userAcountId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerAccountId_key" ON "Account"("providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Url_slug_key" ON "Url"("slug");

-- CreateIndex
CREATE INDEX "Url_slug_idx" ON "Url"("slug");

-- CreateIndex
CREATE INDEX "Url_AuthorId_idx" ON "Url"("AuthorId");

-- CreateIndex
CREATE INDEX "Visit_url_idx" ON "Visit"("url");
