CREATE TABLE product_order (
	product_id int8 NOT NULL,
    order_id int8 NOT NULL,
	quantity int4 NOT NULL,
	subtotal float8 NULL,
	CONSTRAINT product_order_pkey PRIMARY KEY (order_id, product_id),
	CONSTRAINT order_pkey FOREIGN KEY (order_id) REFERENCES p_order(id),
	CONSTRAINT product_pkey FOREIGN KEY (product_id) REFERENCES p_product(id)
);