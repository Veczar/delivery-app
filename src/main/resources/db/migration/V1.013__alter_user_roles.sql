-- Update User Roles to match other tables
UPDATE p_user SET role_id = 4 WHERE id = 1; -- admin
UPDATE p_user SET role_id = 2 WHERE id IN (2, 3, 4, 5, 6);  -- seller
UPDATE p_user SET role_id = 1 WHERE id IN (7, 8, 9, 10);    -- user
UPDATE p_user SET role_id = 3 WHERE id IN (11, 12, 13, 14); -- delivery man
