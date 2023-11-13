CREATE TABLE if not exists p_product (
	id SERIAL PRIMARY KEY,
	description varchar,
	"name" varchar,
	on_sale varchar,
	photo_path varchar,
	price boolean NULL,
);