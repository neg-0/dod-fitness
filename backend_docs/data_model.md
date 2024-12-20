# Atlas Backend Service - Data Model

This document outlines the core data entities and their relationships for Atlas Backend Service. The data model is designed to support the app's key features while maintaining flexibility for future enhancements and aligning with our OpenAPI specifications.

## Core Entities

### 1. User

Represents a user of Atlas.

- id: UUID (Primary Key)
- email: String (Unique)
- passwordHash: String
- role: Enum (SystemAdministrator, UnitLeadership, FitnessSpecialist, NutritionSpecialist, BaseMember)
- createdAt: DateTime
- updatedAt: DateTime
- isDeleted: Boolean
- deletedAt: DateTime (nullable)

### 2. Profile

Stores detailed information about a user's physical characteristics and preferences.

- id: UUID (Primary Key)
- userId: UUID (Foreign Key to User)
- name: String
- age: Integer
- height: Float
- weight: Float
- branch: Enum (Army, Navy, Air Force, Marines, Coast Guard, Space Force)
- currentInstallation: String
- fitnessWaivers: Text
- dietaryRestrictions: Text
- fitnessGoals: Text
- nutritionGoals: Text
- fitnessPreferences: Text
- diningFacilityUsage: Integer
- onBaseRestaurantUsage: Integer
- offBaseRestaurantUsage: Integer
- homeCookingFrequency: Integer
- createdAt: DateTime
- updatedAt: DateTime

### 3. WorkoutPlan

Represents a personalized workout plan for a user.

- id: UUID (Primary Key)
- userId: UUID (Foreign Key to User)
- goal: Enum (strength, endurance, weight_loss, general_fitness)
- branch: Enum (Army, Navy, Air Force, Marines, Coast Guard, Space Force)
- startDate: Date
- endDate: Date
- createdAt: DateTime
- updatedAt: DateTime

### 4. DailyWorkout

Represents a single day's workout within a workout plan.

- id: UUID (Primary Key)
- workoutPlanId: UUID (Foreign Key to WorkoutPlan)
- date: Date
- summary: String
- duration: Integer
- caloriesBurned: Integer
- workoutType: Enum (cardio, strength, yoga, hiit, rest)
- createdAt: DateTime
- updatedAt: DateTime

### 5. Exercise

Represents an individual exercise within a daily workout.

- id: UUID (Primary Key)
- dailyWorkoutId: UUID (Foreign Key to DailyWorkout)
- name: String
- sets: Integer
- reps: Integer
- duration: Integer
- completed: Boolean
- difficulty: Enum (easy, just-right, hard)
- createdAt: DateTime
- updatedAt: DateTime

### 6. NutritionPlan

Represents a personalized nutrition plan for a user.

- id: UUID (Primary Key)
- userId: UUID (Foreign Key to User)
- goal: Enum (weight_loss, muscle_gain, maintenance)
- dailyCalories: Integer
- protein: Integer
- carbohydrates: Integer
- fat: Integer
- startDate: Date
- endDate: Date
- createdAt: DateTime
- updatedAt: DateTime

### 7. Meal

Represents a meal within a nutrition plan.

- id: UUID (Primary Key)
- nutritionPlanId: UUID (Foreign Key to NutritionPlan)
- name: String
- createdAt: DateTime
- updatedAt: DateTime

### 8. Food

Represents a food item within a meal.

- id: UUID (Primary Key)
- mealId: UUID (Foreign Key to Meal)
- name: String
- amount: String
- calories: Integer
- createdAt: DateTime
- updatedAt: DateTime

### 9. ProgressLog

Tracks a user's progress over time.

- id: UUID (Primary Key)
- userId: UUID (Foreign Key to User)
- date: Date
- weight: Float
- bodyFatPercentage: Float
- createdAt: DateTime
- updatedAt: DateTime

## Relationships

1. User (1) - (1) Profile
2. User (1) - (N) WorkoutPlan
3. User (1) - (N) NutritionPlan
4. User (1) - (N) ProgressLog
5. WorkoutPlan (1) - (N) DailyWorkout
6. DailyWorkout (1) - (N) Exercise
7. NutritionPlan (1) - (N) Meal
8. Meal (1) - (N) Food

## Indexes

To optimize query performance, consider creating indexes on:

- User: email
- Profile: userId
- WorkoutPlan: userId, startDate, endDate
- DailyWorkout: workoutPlanId, date
- NutritionPlan: userId, startDate, endDate
- ProgressLog: userId, date

## Data Integrity

- Implement foreign key constraints to maintain referential integrity
- Use cascading deletes where appropriate (e.g., deleting a WorkoutPlan should delete associated DailyWorkouts and Exercises)

## Soft Deletes

Implement soft deletes for the User entity:

- Use the `isDeleted` boolean field to mark a user as deleted
- Use the `deletedAt` DateTime field to track when the soft delete occurred

Consider implementing similar soft delete functionality for other entities if needed.

## Auditing

For enhanced tracking and compliance:

- Use the `createdAt` and `updatedAt` fields to track when entities are created and modified
- Consider implementing an audit log table to track significant changes to critical data

This data model provides a solid foundation for Atlas Backend Service. It captures the essential entities and relationships required to support the app's core functionalities while aligning with our OpenAPI specifications and database schema. This model allows for future expansion and refinement as needed.