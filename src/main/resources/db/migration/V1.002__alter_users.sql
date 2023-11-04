DROP TABLE IF EXISTS p_user CASCADE;

CREATE TABLE p_user (
	id          SERIAL  PRIMARY KEY,
	first_name  VARCHAR,
    last_name   VARCHAR,
    email       VARCHAR,
	login       VARCHAR,
	password    VARCHAR,
	telephone_number VARCHAR
);
