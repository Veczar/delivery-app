CREATE TABLE p_order (
	id SERIAL NOT NULL,
	completion_date timestamp(6) NULL,
	creation_date timestamp(6) NOT NULL,
    status varchar(255) NOT NULL,
	tip float8 NULL,
	total_price float8 NOT NULL,
	address_end_id int8 NOT NULL,
	address_start_id int8 NOT NULL,
	customer_id int8 NOT NULL,
	delivery_man_id int8 NOT NULL,
	partner_id int8 NOT NULL,
	CONSTRAINT p_order_pkey PRIMARY KEY (id),
    CONSTRAINT p_order_status_check CHECK (((status)::text = ANY ((ARRAY['done'::character varying, 'inPreparation'::character varying, 'inDelivery'::character varying, 'readyForDelivery'::character varying])::text[]))),
	CONSTRAINT address_end_fid FOREIGN KEY (address_end_id) REFERENCES p_address(id),
    CONSTRAINT customer_fid FOREIGN KEY (customer_id) REFERENCES p_user(id),
    CONSTRAINT delivery_man_fid FOREIGN KEY (delivery_man_id) REFERENCES p_delivery_man(id),
    CONSTRAINT address_start_fid FOREIGN KEY (address_start_id) REFERENCES p_address(id),
    CONSTRAINT partner_fid FOREIGN KEY (partner_id) REFERENCES p_partner(id)
);

