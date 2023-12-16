ALTER TABLE p_user DROP COLUMN login;

UPDATE s_role SET name = 'PARTNER' WHERE id = 2;
UPDATE s_role SET name = 'COURIER' WHERE id = 3;
