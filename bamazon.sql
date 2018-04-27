-- DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(255) NOT NULL,
	department_name VARCHAR(255),
	price DECIMAL(6, 2),
	stock_qty INT,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_qty)
  VALUES ("GoPro HERO6 Black", "Electronics", 399.00, 10),
         ("Amazon Echo", "Electronics", 99.99, 200),
         ("Dingo Wag'n Wraps Dog Bones", "Pets", 5.62, 1000),
         ("Scratch Lounge - Reversible Cardboard Cat Scratcher", "Pets", 40.99, 250),
         ("The Mountain 100% Cotton Three Wolf Moon T-Shirt", "Apparel", 16.76, 20),
         ("Bose QuietComfort 35 (Series II) Wireless Headphones", "Electronics", 349.00, 100),
         ("KAMIER Shark Round Washable Soft Cotton Dog/Cat/Pet Bed", "Pets", 21.69, 125),
         ("KATEVO Carry-on Travel Footrest", "Health & Household", 18.99, 250),
         ("Clorox Disinfecting Wipes (3 Pack)", "Health & Household", 14.49, 500),
         ("Philips Sonicare Premium Plaque Control toothbrush heads, HX9044/95, Smart recognition (4 pack)", "Health & Household", 46.99, 45);
         ("Roll Recovery R8", "Health & Household", 249.99, 1);