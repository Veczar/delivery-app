CREATE TABLE p_recurring_orders (
                                    id bigserial NOT NULL,
                                    frequency varchar(255) NULL,
                                    start_date timestamp(6) NULL,
                                    address_end_id int8 NULL,
                                    address_start_id int8 NULL,
                                    customer_id int8 NULL,
                                    product_id int8 NULL,
                                    quantity int4 NOT NULL,
                                    CONSTRAINT p_recurring_orders_frequency_check CHECK (((frequency)::text = ANY ((ARRAY['everyDay'::character varying, 'every2Days'::character varying, 'every3days'::character varying, 'every4days'::character varying, 'every5days'::character varying, 'every6days'::character varying, 'everyWeek'::character varying, 'every2Weeks'::character varying, 'every4Weeks'::character varying, 'everyMonth'::character varying])::text[]))),
CONSTRAINT id PRIMARY KEY (id),
CONSTRAINT f_address_end_id FOREIGN KEY (address_end_id) REFERENCES p_address(id),
CONSTRAINT f_address_start_id FOREIGN KEY (address_start_id) REFERENCES p_address(id),
CONSTRAINT f_product_id FOREIGN KEY (product_id) REFERENCES p_product(id),
CONSTRAINT f_customer_id FOREIGN KEY (customer_id) REFERENCES p_user(id)
);

