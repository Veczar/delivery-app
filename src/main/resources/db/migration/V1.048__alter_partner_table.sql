INSERT INTO p_partner
(id, "name", account_number, contact_number, owner_id, photo_path, "type", description, open_hour, close_hour, website_link, expected_waiting_time)
VALUES(nextval('p_seller_id_seq'::regclass), 'Kotlerciarnia', '12345678912345678912345678', '123123123', 16, 'b4c23d8a-c3c2-4850-917e-0627cd19ed1f.png', 'restaurant', '', '8:00', '16:00', '', 0);