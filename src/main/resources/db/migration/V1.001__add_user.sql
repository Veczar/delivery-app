create table if not exists "user" (
	id        SERIAL    PRIMARY KEY,
	firstName VARCHAR,
    lastName  VARCHAR,
	password  VARCHAR,
	telephone_number VARCHAR
);
