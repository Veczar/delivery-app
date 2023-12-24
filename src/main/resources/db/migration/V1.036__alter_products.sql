ALTER TABLE p_product ADD partner_id int8;
UPDATE p_product SET partner_id = 1 WHERE  id = 1;
UPDATE p_product SET partner_id = 2 WHERE  id = 2;
ALTER TABLE p_product ALTER COLUMN partner_id SET NOT NULL;
ALTER TABLE p_product ADD CONSTRAINT f_partner_id FOREIGN KEY (partner_id) REFERENCES p_partner(id);