CREATE TABLE partner_category (
	partner_id int8 NOT NULL,
	category_id int8 NOT NULL,
	CONSTRAINT partner_category_pkey PRIMARY KEY (partner_id, category_id)
);

ALTER TABLE partner_category ADD CONSTRAINT partner_id FOREIGN KEY (partner_id) REFERENCES p_partner(id);
ALTER TABLE partner_category ADD CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES p_category(id);