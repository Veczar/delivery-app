ALTER table p_product add column partner_id INT;
ALTER table p_product add CONSTRAINT FK_partner_products foreign key (partner_id) references p_partner(id);
