CREATE DATABASE chat;

USE chat;


CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT,
  users_id int NOT NULL,
  content varchar(255) NOT NULL,
  roomname varchar(255),
  PRIMARY KEY (id),
  FOREIGN KEY (users_id) REFERENCES users(id)
);

/* Create other tables and define schemas for them here! */



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
