ALTER TABLE p_partner
    ADD COLUMN description VARCHAR(255),
    ADD COLUMN open_hour VARCHAR(5),
    ADD COLUMN close_hour VARCHAR(5),
    ADD COLUMN website_link VARCHAR(255),
    ADD COLUMN expected_waiting_time INT;
