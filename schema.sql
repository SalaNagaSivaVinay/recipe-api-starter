<<<<<<< HEAD
\c recipes_db;

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  ingredients TEXT,
  instructions TEXT,
  rating FLOAT,
  total_time INT
=======

-- schema.sql
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    cuisine VARCHAR(255),
    title VARCHAR(255),
    rating FLOAT,
    prep_time INT,
    cook_time INT,
    total_time INT,
    description TEXT,
    nutrients JSONB,
    serves VARCHAR(50)
>>>>>>> 8c411dbed1fc23e127cd5ab4d8196f98719365df
);
