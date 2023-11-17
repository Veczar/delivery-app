CREATE TABLE if not exists p_address (
	id SERIAL PRIMARY KEY,
	city VARCHAR,
	postal_code VARCHAR,
	street VARCHAR
);