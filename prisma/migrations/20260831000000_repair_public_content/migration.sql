-- Remove the retired team member and any content that could expose the profile.
DELETE FROM "Article"
WHERE "authorId" IN (
    SELECT "id"
    FROM "Author"
    WHERE LOWER("email") = 'luke@admin.com'
       OR LOWER("name") = 'luke delahunty'
);

DELETE FROM "Presentation"
WHERE "authorId" IN (
    SELECT "id"
    FROM "Author"
    WHERE LOWER("email") = 'luke@admin.com'
       OR LOWER("name") = 'luke delahunty'
);

DELETE FROM "Author"
WHERE LOWER("email") = 'luke@admin.com'
   OR LOWER("name") = 'luke delahunty';

-- The slide library was renamed to decks, but the original database row kept
-- pointing at the removed public directory.
UPDATE "Presentation"
SET "src" = '/decks/skeena-gold-silver.pdf',
    "imageUrl" = '/decks/skeena-gold-silver-cover.jpg'
WHERE "slug" = 'skeena-gold-silver'
  AND (
      "src" IS DISTINCT FROM '/decks/skeena-gold-silver.pdf'
      OR "imageUrl" IS DISTINCT FROM '/decks/skeena-gold-silver-cover.jpg'
  );
