create table if not exists p_partner_review (
	id         SERIAL    PRIMARY KEY,
	grade_in_stars INTEGER,
    description  VARCHAR,
	date   TIMESTAMP,
    reviewer_id INTEGER,
    rated_id INTEGER,
    FOREIGN KEY (reviewer_id) REFERENCES p_user(id),
    FOREIGN KEY (rated_id) REFERENCES p_partner(id)
);
