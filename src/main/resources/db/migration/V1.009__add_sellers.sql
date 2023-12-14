CREATE TABLE IF NOT EXISTS p_seller (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    account_number VARCHAR(26),
    contact_number VARCHAR(15),
    address_id BIGINT,
    owner_id BIGINT,
    FOREIGN KEY (address_id) REFERENCES p_address(id),
    FOREIGN KEY (owner_id) REFERENCES p_user(id)
);