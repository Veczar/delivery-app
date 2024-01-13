INSERT INTO public.p_user (first_name,last_name,email,"password",telephone_number,role_id) VALUES
                                                                                               ('Janusz','Kowalski','janusz.kowalski@gmail.com','$2a$10$m4cTYUtY.dA7o5PURX7OG.6xVRX9o6JtjYHtPz61NC2uTagUgu80e','708123422',1),
                                                                                               ('Paweł','Kowalski','pawel.kowalski@gmail.com','$2a$10$8zs/4zNe0Wk1eC/0sLju1e3VxK3FitGxqxVC6NiMpeF3ooqsBBAlW','+48 607123123',2),
                                                                                               ('Marek','Piątek','marek.piatek@gmail.com','$2a$10$O4THOyq5KFgifww8W..efeFCJwnrKcPBq/8.YhLsWpsAjMjvaxGue','+48 456123123',2),
                                                                                               ('Piotr','Kowalczyk','piotr.kowalczyk@gmail.com','$2a$10$SiNhsC6qGm758HPNJcWjKOyNkHucnbsYgIL.SJbVMrFK1R2nBkgFy','+48 123412431',2),
                                                                                               ('Filip','Morus','filip.morus@gmail.com','$2a$10$.dbmkKF56UFCSjRqCf1HquoKgc8g0EP2p5IQ.b7s6gifyBeynQRx.','123654900',3),
                                                                                               ('Karol','Krakowiak','karol.krakowiak@gmail.com','$2a$10$HRgkE50n7H/O5zd5SOXdp.QREhS.8NAS.U.5YKN91FZGk/p8Dbr2W','123421141',3),
                                                                                               ('Grzegorz','Fiołek','admin@gmail.com','$2a$10$rcoJmroMZ6u2mWwBDWwZJOFQ29QhfImvh3r/1wTDJ1cfOV9nKf1rG','512 123 123',4),
                                                                                               ('Rafał','Fiołkowski','rafal.ciolek12@gmail.com','$2a$10$wr1cYlySvQGbEzSpmakfAuO2JjS2CXy3uyt0iI6w5JxtJzn0zwGsi','607505341',1);
INSERT INTO public.p_address (city,postal_code,street,user_id) VALUES
	 ('Padew Narodowa','39-340','Domacyny 58',1),
	 ('Kraków','12-123','Prądnicka 65',2),
	 ('Kraków','12-131','Warszawska 12',2),
	 ('Kraków','12-231','Prądnicka 50',3),
	 ('Wrocław','12-876','Centralna 12',5),
	 ('Kraków','12-321','Warszawska 12',4),
	 ('Wrocław','12-876','Centralna 12',7);
INSERT INTO public.p_courier (working_area,user_id,account_number) VALUES
	 ('Kraków',6,'42144444213233233333333333');

INSERT INTO public.p_partner (name,account_number,contact_number,owner_id,photo_path,"type",description,open_hour,close_hour,website_link,expected_waiting_time) VALUES
                                                                                                                                                                     ('KFC','11111111111111111111111111','+48 123414211',4,'bb7f07f9-7a3b-4214-acc1-b8fc40ac5030.png','restaurant','Fastfood resturants with tasty chikens and burgers','8:00','22:00','kfc.pl',12),
                                                                                                                                                                     ('Subway','44444444444441244444444444','+48 786123123',5,'d6f47976-e843-4a76-b6cc-b2259edd50f4.png','restaurant','Subway is a resturant with long and beatiful history','12:00','23:00','restaurants.subway.com',12),
                                                                                                                                                                     ('Mcdonald''s','12123412341234123412341234','+48 809123871',3,'9cc0e762-2835-4400-8769-27759bb41aff.png','restaurant','Fastfood resturant located in city center of Kraków','8:00','21:00','mcdonalds.pl',5);

INSERT INTO public.p_product (description,name,on_sale,photo_path,price,partner_id) VALUES
                                                                                        ('Hot tassty latte!','Latte',true,'c66232dc-cfd7-45f5-b086-2f4606339d8c.jpg',1.5,1),
                                                                                        ('Coca-Cola like in the old days!','Coca-Cola',false,'4842460d-546d-4f88-bcfa-d5284883a3fb.png',12,1),
                                                                                        ('Buy 2 get one for free!','Double cheese burger',false,'a97cf575-bfee-487f-a6ce-2117e5b16e76.png',15,1);

INSERT INTO public.p_product_category (product_id,category_id) VALUES
                                                                   (1,11),
                                                                   (2,1),
                                                                   (3,7);


INSERT INTO public.p_order (completion_date,creation_date,status,tip,total_price,address_end_id,address_start_id,customer_id,courier_id,partner_id,distance_in_km,rating) VALUES
	 ('2024-01-13 20:36:07.443','2024-01-13 19:34:53.257','done',1.0,31.59,2,4,2,1,1,0.85,4);

INSERT INTO public.p_product_order (product_id,order_id,quantity,subtotal) VALUES
                                                                               (2,1,1,1.5),
                                                                               (3,1,2,30.0);

INSERT INTO public.p_partner_review (grade_in_stars,description,created_date,reviewer_id,rated_id) VALUES
	 (3,'Good quality of servie','2024-01-13',2,1);

INSERT INTO public.p_recurring_orders (frequency,start_date,address_end_id,address_start_id,customer_id,product_id,quantity) VALUES
	 ('every3Weeks','2024-01-30 13:00:00',3,4,2,3,1);

INSERT INTO public.p_complaint (title,description,method_of_contact,creation_date) VALUES
    ('Order was not delivered','Hi, I want to report that my order from McDonalds wa not delivered and partner isn''t responding. Please help.','phone','2024-01-13 18:17:09.658');
