-- Slides and decks represent the same publication format.
-- Consolidate existing slide records into the single DECK type before removing SLIDES.
ALTER TYPE "PresentationType" RENAME TO "PresentationType_old";

CREATE TYPE "PresentationType" AS ENUM ('DECK');

ALTER TABLE "Presentation"
ALTER COLUMN "type" TYPE "PresentationType"
USING 'DECK'::"PresentationType";

DROP TYPE "PresentationType_old";
