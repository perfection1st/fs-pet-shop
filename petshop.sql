DROP TABLE pet;

CREATE TABLE IF NOT EXISTS pet (
  pet_id SERIAL PRIMARY KEY,        -- AUTO_INCREMENT integer, as primary key
  pet_name VARCHAR(50) NOT NULL,    
  pet_kind VARCHAR(50) NOT NULL,
  pet_age INTEGER NOT NULL
);

INSERT INTO pet (pet_name, pet_kind, pet_age) VALUES
('Fido', 'pigeon', 3),
('Buttons', 'snake', 7),
('Peaches', 'hamster', 1);