CREATE TABLE IF NOT EXISTS p_complaint (
id SERIAL PRIMARY KEY,
title VARCHAR(60),
description VARCHAR(300),
method_of_contact VARCHAR(5),
creation_date timestamp(6) NOT NULL,
user_id SERIAL NOT NULL,
FOREIGN KEY (user_id) REFERENCES p_user(id)
);
INSERT INTO p_complaint
(title, description, method_of_contact, creation_date, user_id)
VALUES('Lost account', 'Lost access to account. Please help me.', 'email', '2024-01-12 00:56:15.644', 1),
(E'Didn \'t get my order', E'I didn\'t get my order number 32 please help or else I will call a police on on you', 'phone', '2024-01-12 00:56:15.644', 2);
