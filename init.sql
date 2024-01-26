-- init.sql

CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    favorite_festivals INTEGER[] NOT NULL -- IDs of saved festivals
);

CREATE TABLE IF NOT EXISTS "festival" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    music_genre VARCHAR(50)
);

INSERT INTO "user" (nickname, email, password, favorite_festivals) 
VALUES ('Ala', 'ala@wp.pl', 'ala', ARRAY[]::INTEGER[]);

INSERT INTO "festival" (name, latitude, longitude, start_date, end_date, music_genre) 
VALUES 
    ('Berlin music festival', 52.5200, 13.4050, '2024-07-01', '2024-07-03', 'Deephouse'),
    ('Paris music festival', 48.8566, 2.3522, '2024-08-15', '2024-08-18', 'Rap');

UPDATE "user" 
SET favorite_festivals = ARRAY(
    SELECT id FROM "festival" WHERE name IN ('Paris music festival')
)
WHERE email = 'ala@wp.pl';