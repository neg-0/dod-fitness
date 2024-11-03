# Atlas Backend Service - Database Schema

This document outlines the database schema for Atlas Backend Service. The schema is designed to support the app's key features and align with the OpenAPI specifications.

## Tables

### Users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('SystemAdministrator', 'UnitLeadership', 'FitnessSpecialist', 'NutritionSpecialist', 'BaseMember') NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_email ON users(email);
```

### Profiles

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  age INTEGER,
  height FLOAT,
  weight FLOAT,
  branch ENUM('Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard', 'Space Force'),
  current_installation VARCHAR(255),
  fitness_waivers TEXT,
  dietary_restrictions TEXT,
  fitness_goals TEXT,
  nutrition_goals TEXT,
  fitness_preferences TEXT,
  dining_facility_usage INTEGER,
  on_base_restaurant_usage INTEGER,
  off_base_restaurant_usage INTEGER,
  home_cooking_frequency INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
```

### WorkoutPlans

```sql
CREATE TABLE workout_plans (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  goal ENUM('strength', 'endurance', 'weight_loss', 'general_fitness'),
  branch ENUM('Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard', 'Space Force'),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_workout_plans_user_id ON workout_plans(user_id);
CREATE INDEX idx_workout_plans_date_range ON workout_plans(start_date, end_date);
```

### DailyWorkouts

```sql
CREATE TABLE daily_workouts (
  id UUID PRIMARY KEY,
  workout_plan_id UUID REFERENCES workout_plans(id),
  date DATE,
  summary TEXT,
  duration INTEGER,
  calories_burned INTEGER,
  workout_type ENUM('cardio', 'strength', 'yoga', 'hiit', 'rest'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_daily_workouts_workout_plan_id ON daily_workouts(workout_plan_id);
CREATE INDEX idx_daily_workouts_date ON daily_workouts(date);
```

### Exercises

```sql
CREATE TABLE exercises (
  id UUID PRIMARY KEY,
  daily_workout_id UUID REFERENCES daily_workouts(id),
  name VARCHAR(255) NOT NULL,
  sets INTEGER,
  reps INTEGER,
  duration INTEGER,
  completed BOOLEAN DEFAULT FALSE,
  difficulty ENUM('easy', 'just-right', 'hard'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_exercises_daily_workout_id ON exercises(daily_workout_id);
```

### NutritionPlans

```sql
CREATE TABLE nutrition_plans (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  goal ENUM('weight_loss', 'muscle_gain', 'maintenance'),
  daily_calories INTEGER,
  protein INTEGER,
  carbohydrates INTEGER,
  fat INTEGER,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_nutrition_plans_user_id ON nutrition_plans(user_id);
CREATE INDEX idx_nutrition_plans_date_range ON nutrition_plans(start_date, end_date);
```

### Meals

```sql
CREATE TABLE meals (
  id UUID PRIMARY KEY,
  nutrition_plan_id UUID REFERENCES nutrition_plans(id),
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_meals_nutrition_plan_id ON meals(nutrition_plan_id);
```

### Foods

```sql
CREATE TABLE foods (
  id UUID PRIMARY KEY,
  meal_id UUID REFERENCES meals(id),
  name VARCHAR(255) NOT NULL,
  amount VARCHAR(255) NOT NULL,
  calories INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_foods_meal_id ON foods(meal_id);
```

### ProgressLogs

```sql
CREATE TABLE progress_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE,
  weight FLOAT,
  body_fat_percentage FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_progress_logs_user_id ON progress_logs(user_id);
CREATE INDEX idx_progress_logs_date ON progress_logs(date);
```

## Notes

1. This schema uses PostgreSQL-specific syntax. Adjust as needed for other database systems.
2. UUIDs are used for primary keys to ensure uniqueness across distributed systems.
3. TIMESTAMP WITH TIME ZONE is used for all date/time fields to ensure proper timezone handling.
4. Indexes are created on foreign keys and frequently queried fields to optimize performance.
5. Enum types are used where appropriate to ensure data integrity.
6. Soft delete functionality is implemented for the Users table. Consider adding similar functionality to other tables if needed.
7. Consider implementing triggers or application-level logic to update the `updated_at` fields automatically.
8. For production use, implement proper access controls, encryption for sensitive data, and regular backups.