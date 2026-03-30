-- Proizvodi
INSERT INTO product (id, name, description, gender_type, product_type)
VALUES
    (1, 'Majica Techno', 'Crna majica so logo', 'MEN', 'MAICA'),
    (2, 'Dukser Ice', 'Siv dukser so kapuljac', 'WOMAN', 'DUKSER'),
    (3, 'Trenerki Set Kids', 'Plavi set dolen del', 'KIDS', 'DOLEN_DEL_TRENERKI'),
    (4, 'Jakna Wind', 'Vodootporna jakna', 'MEN', 'JAKNA'),
    (5, 'Gradnik Sport', 'Komforen gradnik za trening', 'WOMAN', 'GRADNIK');

-- Varijanti
INSERT INTO product_variant (id, product_id, color, size, price, stock)
VALUES
    (1, 1, 'Crna', 'M', 25.99, 50),
    (2, 1, 'Bela', 'L', 25.99, 30),
    (3, 2, 'Siva', 'S', 40.50, 20),
    (4, 2, 'Crna', 'M', 40.50, 15),
    (5, 3, 'Plava', 'XS', 15.00, 25),
    (6, 3, 'Plava', 'S', 15.00, 20),
    (7, 4, 'Crvena', 'L', 60.00, 10),
    (8, 5, 'Crna', 'M', 20.00, 40);

INSERT INTO "user" (id,username, password, name, surname, role)
VALUES
    (1,'zoki', 'admin', 'Admin', 'R', 'ROLE_ADMIN'),
    (2,'use', 'user', 'User', 'US', 'ROLE_USER');