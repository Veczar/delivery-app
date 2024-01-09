ALTER TABLE p_partner ADD photo_path VARCHAR(60) NULL;

UPDATE p_partner SET photo_path = 'partners\b4c23d8a-c3c2-4850-917e-0627cd19ed1a.png'  WHERE id = 1;
UPDATE p_partner SET photo_path = 'partners\b4c23d8a-c312-4850-917e-0627cd19ed1a.png'  WHERE id = 2;
UPDATE p_partner SET photo_path = 'partners\b4c23d8a-c3c2-4850-917e-0727cd19ed1a.png'  WHERE id = 3;
UPDATE p_partner SET photo_path = 'partners\b4c23d9a-c3c2-4850-917e-0627cd19ed1a.png'  WHERE id = 4;
UPDATE p_partner SET photo_path = 'partners\b4c23d81-c3c2-4850-917e-0727cd19ed1a.png'  WHERE id = 5;

ALTER TABLE p_partner ALTER COLUMN photo_path SET NOT NULL;

ALTER TABLE p_partner ADD "type" VARCHAR(60) NULL;
ALTER TABLE p_partner ADD CONSTRAINT p_partner_type_check CHECK ((("type")::text = ANY ((ARRAY['other'::character varying, 'restaurant'::character varying, 'pharmacy'::character varying, 'groceryStore'::character varying, 'florists'::character varying, 'coffeehouse'::character varying])::text[])));

UPDATE p_partner SET "type" = 'restaurant'  WHERE id = 1;
UPDATE p_partner SET "type" = 'restaurant'  WHERE id = 2;
UPDATE p_partner SET "type" = 'restaurant'  WHERE id = 3;
UPDATE p_partner SET "type" = 'restaurant'  WHERE id = 4;
UPDATE p_partner SET "type" = 'restaurant'  WHERE id = 5;

ALTER TABLE p_partner ALTER COLUMN "type" SET NOT NULL;

DROP TABLE partner_category;

DELETE FROM p_category WHERE id > 3;


