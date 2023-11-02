create table if not exists p_user (
	id         SERIAL    PRIMARY KEY,
	first_name VARCHAR,
    last_name  VARCHAR,
	password   VARCHAR,
	telephone_number VARCHAR
);
