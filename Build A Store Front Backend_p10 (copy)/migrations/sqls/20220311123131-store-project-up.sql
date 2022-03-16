
/* Replace with your SQL commands */

/* Users Table */
CREATE TABLE Users(id SERIAL PRIMARY KEY,first_name VARCHAR(50), last_name VARCHAR(50),user_name VARCHAR(30),password VARCHAR(20));

/* Orders Table */
CREATE TABLE Orders(id SERIAL PRIMARY KEY,quantity INTEGER,user_id INTEGER REFERENCES Users(id),status VARCHAR(20));

/* Product Table */
CREATE TABLE Product(id SERIAL PRIMARY KEY,name VARCHAR(30),price INTEGER);

/* Orders_Product Table */
/* Many to Many relationship */
CREATE TABLE Orders_product(id SERIAL PRIMARY KEY,order_id INTEGER REFERENCES Orders(id),product_id INTEGER REFERENCES Product(id));