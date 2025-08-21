
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
);
