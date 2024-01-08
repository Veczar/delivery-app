ALTER TABLE p_order ADD COLUMN distance_in_km float8 NULL;

INSERT INTO p_order
(completion_date,creation_date,status,tip,total_price,address_end_id,address_start_id,customer_id,
delivery_man_id,partner_id, distance_in_km) VALUES
