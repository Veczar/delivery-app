ALTER TABLE p_order ADD COLUMN distance_in_km float8 NULL;

INSERT INTO public.p_order (completion_date,creation_date,status,tip,total_price,address_end_id,address_start_id,
                            customer_id,courier_id,partner_id, distance_in_km) VALUES
                           (NULL,'2023-11-21 00:10:00','inPreparation',3.0,2.0,3,2,1,5,1,12.0),
                           (NULL,'2023-11-21 00:30:00','inDelivery',3.0,2.0,3,1,1,5,2,12.0),
                           (NULL,'2023-11-21 00:20:00','inDelivery',3.0,2.0,3,2,1,5,1,12.0),
                           (NULL,'2023-11-21 00:30:00','readyForDelivery',3.0,2.0,3,2,1,5,1,12.0),
                           ('2023-11-21 00:00:20','2023-11-21 00:00:00','done',3.0,2.0,3,2,1,5,1,12.0);