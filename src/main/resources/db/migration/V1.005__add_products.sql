CREATE TABLE if not exists p_product (
	id SERIAL PRIMARY KEY,
	description varchar,
	"name" varchar,
	on_sale boolean NULL,
	photo_path varchar,
	price NUMERIC
);