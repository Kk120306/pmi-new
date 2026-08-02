-- CreateEnum
CREATE TYPE "PresentationType" AS ENUM ('DECK', 'SLIDES');

-- CreateTable
CREATE TABLE "Presentation" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "tags" TEXT[],
    "type" "PresentationType" NOT NULL,
    "pageCount" INTEGER NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Presentation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Presentation_slug_key" ON "Presentation"("slug");

-- CreateIndex
CREATE INDEX "Presentation_authorId_idx" ON "Presentation"("authorId");

-- CreateIndex
CREATE INDEX "Presentation_type_publishedAt_idx"
ON "Presentation"("type", "publishedAt");

-- AddForeignKey
ALTER TABLE "Presentation"
ADD CONSTRAINT "Presentation_authorId_fkey"
FOREIGN KEY ("authorId") REFERENCES "Author"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- SeedData
INSERT INTO "Presentation" (
    "id",
    "title",
    "slug",
    "summary",
    "src",
    "imageUrl",
    "tags",
    "type",
    "pageCount",
    "publishedAt",
    "authorId"
)
SELECT
    1,
    'Skeena Gold & Silver',
    'skeena-gold-silver',
    'An equity research presentation on Skeena Gold & Silver, covering the Eskay Creek project, industry dynamics, investment thesis, valuation, key risks, and catalysts.',
    '/slides/skeena-gold-silver.pdf',
    '/slides/skeena-gold-silver-cover.jpg',
    ARRAY['Equity Research', 'Mining', 'Gold & Silver']::TEXT[],
    'SLIDES'::"PresentationType",
    37,
    TIMESTAMP '2026-03-29 12:00:00',
    "id"
FROM "Author"
WHERE "email" = 'kyle@admin.com'
ON CONFLICT DO NOTHING;
