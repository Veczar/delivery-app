CREATE TABLE p_category (
	id bigserial NOT NULL,
	description varchar(255) NULL,
	"name" varchar(255) NULL,
	CONSTRAINT p_category_pkey PRIMARY KEY (id)
);