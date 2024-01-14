-- public.p_category definition

-- Drop table

-- DROP TABLE public.p_category;

CREATE TABLE public.s_category (
	id bigserial NOT NULL,
	description varchar(255) NULL,
	"name" varchar(255) NULL,
	CONSTRAINT s_category_pkey PRIMARY KEY (id)
);


-- public.s_role definition

-- Drop table

-- DROP TABLE public.s_role;

CREATE TABLE public.s_role (
	id int4 NOT NULL,
	"name" varchar NULL,
	CONSTRAINT s_role_pkey PRIMARY KEY (id)
);


-- public.p_user definition

-- Drop table

-- DROP TABLE public.p_user;

CREATE TABLE public.p_user (
	id serial4 NOT NULL,
	first_name varchar NULL,
	last_name varchar NULL,
	email varchar NULL,
	"password" varchar NULL,
	telephone_number varchar NULL,
	role_id int4 NULL,
	CONSTRAINT p_user_pkey PRIMARY KEY (id),
	CONSTRAINT fk_users_roles FOREIGN KEY (role_id) REFERENCES public.s_role(id)
);


-- public.p_address definition

-- Drop table

-- DROP TABLE public.p_address;

CREATE TABLE public.p_address (
	id serial4 NOT NULL,
	city varchar NULL,
	postal_code varchar NULL,
	street varchar NULL,
	user_id int8 NULL,
	CONSTRAINT p_address_pkey PRIMARY KEY (id),
	CONSTRAINT fk_user_address FOREIGN KEY (user_id) REFERENCES public.p_user(id)
);


-- public.p_complaint definition

-- Drop table

-- DROP TABLE public.p_complaint;

CREATE TABLE public.p_complaint (
	id serial4 NOT NULL,
	title varchar(60) NULL,
	description varchar(300) NULL,
	method_of_contact varchar(5) NULL,
	creation_date timestamp(6) NOT NULL,
	user_id serial4 NOT NULL,
	CONSTRAINT p_complaint_pkey PRIMARY KEY (id),
	CONSTRAINT p_complaint_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.p_user(id)
);


-- public.p_courier definition

-- Drop table

-- DROP TABLE public.p_courier;

CREATE TABLE public.p_courier (
	id serial4 NOT NULL,
	working_area varchar NULL,
	user_id int4 NULL,
	account_number varchar(26) NULL,
	CONSTRAINT p_courier_pkey PRIMARY KEY (id),
	CONSTRAINT p_courier_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.p_user(id)
);


-- public.p_partner definition

-- Drop table

-- DROP TABLE public.p_partner;

CREATE TABLE public.p_partner (
	id serial4 NOT NULL,
	"name" varchar NULL,
	account_number varchar(26) NULL,
	contact_number varchar(15) NULL,
	owner_id int8 NULL,
	photo_path varchar(60) NOT NULL,
	"type" varchar(60) NOT NULL,
	description varchar(255) NULL,
	open_hour varchar(5) NULL,
	close_hour varchar(5) NULL,
	website_link varchar(255) NULL,
	expected_waiting_time int4 NULL,
	CONSTRAINT p_partner_pkey PRIMARY KEY (id),
	CONSTRAINT p_partner_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.p_user(id)
);


-- public.p_partner_review definition

-- Drop table

-- DROP TABLE public.p_partner_review;

CREATE TABLE public.p_partner_review (
	id serial4 NOT NULL,
	grade_in_stars int4 NULL,
	description varchar NULL,
	created_date varchar NULL,
	reviewer_id int4 NULL,
	rated_id int4 NULL,
	CONSTRAINT p_partner_review_pkey PRIMARY KEY (id),
	CONSTRAINT p_partner_review_rated_id_fkey FOREIGN KEY (rated_id) REFERENCES public.p_partner(id),
	CONSTRAINT p_partner_review_reviewer_id_fkey FOREIGN KEY (reviewer_id) REFERENCES public.p_user(id)
);


-- public.p_product definition

-- Drop table

-- DROP TABLE public.p_product;

CREATE TABLE public.p_product (
	id serial4 NOT NULL,
	description varchar NULL,
	"name" varchar NULL,
	on_sale bool NULL,
	photo_path varchar NULL,
	price numeric NULL,
	partner_id int8 NOT NULL,
	CONSTRAINT p_product_pkey PRIMARY KEY (id),
	CONSTRAINT f_partner_id FOREIGN KEY (partner_id) REFERENCES public.p_partner(id)
);


-- public.p_recurring_orders definition

-- Drop table

-- DROP TABLE public.p_recurring_orders;

CREATE TABLE public.p_recurring_orders (
	id bigserial NOT NULL,
	frequency varchar(255) NULL,
	start_date timestamp(6) NULL,
	address_end_id int8 NULL,
	address_start_id int8 NULL,
	customer_id int8 NULL,
	product_id int8 NULL,
	quantity int4 NOT NULL,
	CONSTRAINT id PRIMARY KEY (id),
	CONSTRAINT f_address_end_id FOREIGN KEY (address_end_id) REFERENCES public.p_address(id),
	CONSTRAINT f_address_start_id FOREIGN KEY (address_start_id) REFERENCES public.p_address(id),
	CONSTRAINT f_customer_id FOREIGN KEY (customer_id) REFERENCES public.p_user(id),
	CONSTRAINT f_product_id FOREIGN KEY (product_id) REFERENCES public.p_product(id)
);


-- public.product_category definition

-- Drop table

-- DROP TABLE public.product_category;

CREATE TABLE public.p_product_category (
	product_id int8 NOT NULL,
	category_id int8 NOT NULL,
	CONSTRAINT product_category_pkey PRIMARY KEY (product_id, category_id),
	CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES public.s_category(id),
	CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.p_product(id)
);


-- public.p_order definition

-- Drop table

-- DROP TABLE public.p_order;

CREATE TABLE public.p_order (
	id serial4 NOT NULL,
	completion_date timestamp(6) NULL,
	creation_date timestamp(6) NOT NULL,
	status varchar(255) NOT NULL,
	tip float8 NULL,
	total_price float8 NULL,
	address_end_id int8 NOT NULL,
	address_start_id int8 NOT NULL,
	customer_id int8 NOT NULL,
	courier_id int8 NULL,
	partner_id int8 NOT NULL,
	distance_in_km float8 NULL,
	rating int8 NULL,
	CONSTRAINT p_order_pkey PRIMARY KEY (id),
	CONSTRAINT address_end_fid FOREIGN KEY (address_end_id) REFERENCES public.p_address(id),
	CONSTRAINT address_start_fid FOREIGN KEY (address_start_id) REFERENCES public.p_address(id),
	CONSTRAINT customer_fid FOREIGN KEY (customer_id) REFERENCES public.p_user(id),
	CONSTRAINT courier_fid FOREIGN KEY (courier_id) REFERENCES public.p_courier(id),
	CONSTRAINT partner_fid FOREIGN KEY (partner_id) REFERENCES public.p_partner(id)
);


-- public.product_order definition

-- Drop table

-- DROP TABLE public.product_order;

CREATE TABLE public.p_product_order (
	product_id int8 NOT NULL,
	order_id int8 NOT NULL,
	quantity int4 NOT NULL,
	subtotal float8 NULL,
	CONSTRAINT product_order_pkey PRIMARY KEY (order_id, product_id),
	CONSTRAINT order_pkey FOREIGN KEY (order_id) REFERENCES public.p_order(id),
	CONSTRAINT product_pkey FOREIGN KEY (product_id) REFERENCES public.p_product(id)
);


-- set up roles

INSERT INTO s_role(id, name) VALUES
    (1, 'USER'),
    (2, 'PARTNER'),
    (3, 'COURIER'),
    (4, 'ADMIN');


-- set up categories

INSERT INTO public.s_category (description,name) VALUES
    ('drinks', 'drinks'),
    ('', 'coffee'),
    ('all types of flowers', 'flowers'),
    ('over-the-counter medicines', 'medicines'),
    ('', 'pizza'),
    ('', 'kebab'),
    ('', 'burger'),
    ('vegetarian dishes', 'vegetarian'),
    ('Asian cuisine', 'Asian'),
    ('the best', 'Polish'),
    ('Italian food', 'Italian'),
    ('a lot of curry', 'Indian'),
    ('', 'Mexican'),
    ('', 'spaghetti'),
    ('', 'groceries'),
    ('', 'chemicals'),
    ('', 'furniture');
