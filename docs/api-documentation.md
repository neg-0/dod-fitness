# DoD Fitness App - API Documentation

This document outlines the API endpoints used by the DoD Fitness App. Note that in the current implementation, these endpoints are simulated using mock data. However, this documentation serves as a blueprint for future backend implementation.

## Base URL

All API requests should be prefixed with the base URL:

```
https://api.dodfitness.mil/v1
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the JWT token in the Authorization header of your requests:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "access_token": "string",
    "refresh_token": "string",
    "expires_in": 3600
  }
  ```

#### Refresh Token

- **URL**: `/auth/refresh`
- **Method**: `POST`
- **Headers**: Authorization (Bearer Token)
- **Response**:
  ```json
  {
    "access_token": "string",
    "refresh_token": "string",
    "expires_in": 3600
  }
  ```

### User Profile

#### Get Profile

- **URL**: `/profile`
- **Method**: `GET`
- **Headers**: Authorization (Bearer Token)
- **Response**:
  ```json
  {
    "id": "string",
    "name": "string",
    "age": 30,
    "height": 70,
    "weight": 180,
    "branch": "Army",
    "fitnessWaivers": "string",
    "dietaryRestrictions": "string"
  }
  ```

#### Update Profile

- **URL**: `/profile`
- **Method**: `PUT`
- **Headers**: Authorization (Bearer Token)
- **Body**: Same as Get Profile response
- **Response**: Updated profile object

### Workout Plans

#### Generate Workout Plan

- **URL**: `/workout-plan`
- **Method**: `POST`
- **Headers**: Authorization (Bearer Token)
- **Body**:
  ```json
  {
    "goal": "strength",
    "duration": 4,
    "branch": "Army"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "startDate": "2023-05-01",
    "endDate": "2023-05-28",
    "weeklyPlan": [
      {
        "day": "2023-05-01",
        "summary": "Strength Training",
        "duration": 60,
        "caloriesBurned": 300,
        "workoutType": "strength",
        "exercises": [
          {
            "name": "Push-ups",
            "sets": 3,
            "reps": 15
          }
        ]
      }
    ]
  }
  ```

### Nutrition Plans

#### Generate Nutrition Plan

- **URL**: `/nutrition-plan`
- **Method**: `POST`
- **Headers**: Authorization (Bearer Token)
- **Body**:
  ```json
  {
    "goal": "weight_loss",
    "dietaryRestrictions": ["vegetarian"]
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "dailyCalories": 2000,
    "macronutrients": {
      "protein": 150,
      "carbohydrates": 200,
      "fat": 67
    },
    "meals": [
      {
        "name": "Breakfast",
        "foods": [
          {
            "name": "Oatmeal",
            "amount": "1 cup",
            "calories": 300
          }
        ]
      }
    ]
  }
  ```

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of requests. In case of an error, the response will include a JSON object with an `error` field describing the issue.

Example error response:

```json
{
  "error": "Invalid credentials"
}
```

Common status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting

To ensure fair usage of the API, rate limiting is implemented. The current limit is 100 requests per minute per user. If you exceed this limit, you'll receive a 429 (Too Many Requests) status code.

## Versioning

The API version is included in the URL (v1 in this case). As the API evolves, new versions may be introduced to ensure backward compatibility.

For any questions or issues regarding the API, please contact the development team.