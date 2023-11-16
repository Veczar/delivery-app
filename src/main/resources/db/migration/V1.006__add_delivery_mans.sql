CREATE TABLE if not exists p_delivery_man (
	id SERIAL PRIMARY KEY,
	working_area VARCHAR,
	rating INT,
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES p_user(id)
);