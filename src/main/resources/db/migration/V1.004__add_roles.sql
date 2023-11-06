CREATE TABLE s_role (
    id   INT        PRIMARY KEY,
    name VARCHAR
);


INSERT INTO s_role(id, name) VALUES
(1, 'user'),
(2, 'restaurant'),
(3, 'delivery'),
(4, 'admin');

ALTER TABLE p_user ADD COLUMN role_id INT;
ALTER TABLE p_user ADD CONSTRAINT FK_Users_Roles FOREIGN KEY (role_id) REFERENCES s_role(id);
