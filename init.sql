-- init.sql

CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO "user" (nickname, email, password) VALUES ('Ala', 'ala@wp.pl', 'ala');
