INSERT INTO p_category (description, "name") VALUES
  ('Restauracja fast food', 'Fast food'),
  ('Restauracja sushi', 'Sushi'),
  ('Pizzeria', 'Pizzeria'),
  ('Restauracja wegetariańska', 'Wegetariańska'),
  ('Kawiarnia', 'Kawiarnia'),
  ('leki, witaminy itd', 'Apteka'),
  ('prezenty, elektronika, kosmetyki', 'Sklep'),
  ('kawa, śniadania, pieczywo, obiady', 'Restauracja'),
  ('kwiaty', 'Kwiaciarnia'),
  ('Supermarket, słodycze', 'Sklep Spożywczy');

INSERT INTO public.partner_category (partner_id,category_id) VALUES
	 (1,4),
	 (2,4),
	 (3,4),
	 (4,4),
	 (5,4);