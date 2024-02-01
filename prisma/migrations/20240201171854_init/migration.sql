-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" INTEGER NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_slug_key" ON "Url"("slug");

-- CreateIndex
CREATE INDEX "Url_slug_idx" ON "Url"("slug");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_url_fkey" FOREIGN KEY ("url") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
