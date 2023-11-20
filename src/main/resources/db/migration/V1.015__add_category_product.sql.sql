CREATE TABLE product_category (
	product_id int8 NOT NULL,
	category_id int8 NOT NULL,
	CONSTRAINT product_category_pkey PRIMARY KEY (product_id, category_id)
);

ALTER TABLE public.product_category ADD CONSTRAINT fkjvoh3hgnbhv0tegwn6yyqrub2 FOREIGN KEY (product_id) REFERENCES p_product(id);
ALTER TABLE public.product_category ADD CONSTRAINT fkpjjj4qegp0mvyginauwk6t16h FOREIGN KEY (category_id) REFERENCES p_category(id);