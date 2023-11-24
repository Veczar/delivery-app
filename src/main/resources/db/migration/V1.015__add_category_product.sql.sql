CREATE TABLE product_category (
	product_id int8 NOT NULL,
	category_id int8 NOT NULL,
	CONSTRAINT product_category_pkey PRIMARY KEY (product_id, category_id)
);

ALTER TABLE product_category ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES p_product(id);
ALTER TABLE product_category ADD CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES p_category(id);