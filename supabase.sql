-- Drop the existing workout_plans table if it exists
DROP TABLE IF EXISTS workout_plans;
DROP TABLE IF EXISTS nutrition_plans;
-- Create a new workout_plans table
CREATE TABLE workout_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    height INTEGER NOT NULL, -- Height in inches
    weight INTEGER NOT NULL,  -- Weight in lbs
    branch VARCHAR(255) NOT NULL, 
    fitness_waivers TEXT,
    dietary_restrictions TEXT, -- Corrected column name to match your form field
    goals TEXT,
    resting_heart_rate INTEGER,
    heart_rate_variability INTEGER,
    vo2_max INTEGER,
    stress INTEGER,
    body_battery INTEGER,
    intensity INTEGER,
    plan TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

CREATE TABLE nutrition_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    height INTEGER NOT NULL, -- Height in inches
    weight INTEGER NOT NULL,  -- Weight in lbs
    branch VARCHAR(255) NOT NULL, 
    fitness_waivers TEXT,
    dietary_restrictions TEXT, -- Corrected column name to match your form field
    goals TEXT,
    resting_heart_rate INTEGER,
    heart_rate_variability INTEGER,
    vo2_max INTEGER,
    stress INTEGER,
    body_battery INTEGER,
    intensity INTEGER,
    plan TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);