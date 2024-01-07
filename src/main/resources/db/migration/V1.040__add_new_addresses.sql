UPDATE p_address
SET user_id = CASE
    WHEN id IN (1, 2, 3, 4, 5, 6) THEN 2
    WHEN id IN (7, 8, 9, 10) THEN 1
END;
