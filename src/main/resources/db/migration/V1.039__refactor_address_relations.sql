ALTER TABLE p_delivery_man RENAME TO p_courier;
ALTER table p_order RENAME column delivery_man_id to courier_id;

ALTER TABLE p_partner DROP COLUMN address_id;

ALTER TABLE p_address ADD user_id BIGINT;
ALTER TABLE p_address ADD CONSTRAINT fk_user_address FOREIGN KEY (user_id) REFERENCES p_user(id);
