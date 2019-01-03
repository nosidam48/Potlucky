DROP DATABASE IF EXISTS potLucky;
CREATE DATABASE potLucky;

USE potLucky;

CREATE TABLE kingTable
(
    id INT AUTO_INCREMENT NOT NULL,
  host_name VARCHAR(255) NOT NULL,
  host_id INT NOT NULL,
  event_name VARCHAR(30) NOT NULL,
  event_location VARCHAR(255) NOT NULL,
  event_date TIMESTAMP NOT NULL,
  event_description VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  PRIMARY KEY
  (id)
)

CREATE TABLE eventTable
(
id INT AUTO_INCREMENT NOT NULL,
item VARCHAR(100) NOT NULL,
quantity INT NOT NULL,
item_type VARCHAR(30) NOT NULL,
cost DECIMAL,
bringer_id INT,
bringer_name VARCHAR(255),
);

CREATE TABLE users
(
    id INT AUTO_INCREMENT NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY 
    (id)
)

