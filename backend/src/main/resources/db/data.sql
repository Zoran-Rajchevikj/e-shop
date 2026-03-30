CREATE TABLE product (
                         id SERIAL PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         description TEXT,
                         gender_type VARCHAR(10) NOT NULL,
                         product_type VARCHAR(50) NOT NULL
);

CREATE TABLE product_variant (
                                 id SERIAL PRIMARY KEY,
                                 product_id BIGINT REFERENCES product(id),
                                 color VARCHAR(50),
                                 size VARCHAR(5),
                                 price NUMERIC(10,2),
                                 stock INT
);