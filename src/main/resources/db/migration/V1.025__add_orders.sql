CREATE TABLE p_order (
	id SERIAL NOT NULL,
	completion_date timestamp(6) NULL,
	creation_date timestamp(6) NULL,
	tip float8 NULL,
	total_price float8 NULL,
	address_end_id int8 NULL,
	address_start_id int8 NULL,
	customer_id int8 NULL,
	CONSTRAINT p_order_pkey PRIMARY KEY (id)
);

ALTER TABLE p_order ADD CONSTRAINT customer_fid FOREIGN KEY (customer_id) REFERENCES p_user(id);
ALTER TABLE p_order ADD CONSTRAINT address_start_fidx FOREIGN KEY (address_start_id) REFERENCES p_address(id);
ALTER TABLE p_order ADD CONSTRAINT address_end_fidx FOREIGN KEY (address_end_id) REFERENCES p_address(id);