# DoD Fitness App Backend Service - API Overview

## Introduction

The DoD Fitness App Backend Service exposes a RESTful API that serves as the primary interface between the frontend application and the backend services. This document provides an overview of the API structure, design principles, and key considerations.

## API Design Principles

1. RESTful Architecture
   - Follow REST principles for resource-based URL structure
   - Use appropriate HTTP methods (GET, POST, PUT, DELETE) for CRUD operations

2. Versioning
   - Include API version in the URL (e.g., `/v1/resource`)
   - Maintain backward compatibility when introducing new versions

3. Consistency
   - Use consistent naming conventions across all endpoints
   - Maintain a uniform response structure

4. Security
   - Implement authentication for all non-public endpoints
   - Use HTTPS for all communications

5. Performance
   - Design endpoints to minimize the number of requests required
   - Implement pagination for large data sets

6. Error Handling
   - Provide clear, informative error messages
   - Use appropriate HTTP status codes

## API Structure

The API is structured around the following main resources:

1. Authentication
   - Login
   - Refresh Token

2. User Profiles
   - Create, Read, Update user profiles

3. Workout Plans
   - Generate, Retrieve, Update workout plans
   - Log workout progress

4. Nutrition Plans
   - Generate, Retrieve, Update nutrition plans
   - Log meal intake

5. Progress Tracking
   - Retrieve user progress
   - Generate progress reports

## Authentication

All authenticated endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Request/Response Format

- All requests and responses use JSON format
- Use camelCase for property names in JSON payloads

## Pagination

For endpoints that return lists of items, implement pagination using query parameters:

```
GET /api/v1/resources?page=1&limit=20
```

## Rate Limiting

Implement rate limiting to prevent abuse. Include rate limit information in response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1623456789
```

## CORS

Configure CORS (Cross-Origin Resource Sharing) to allow requests only from authorized domains.

## API Documentation

Detailed API specifications are defined in separate OpenAPI (formerly Swagger) files. These files serve as the single source of truth for both frontend and backend teams, ensuring consistency in API implementation and consumption.

The OpenAPI files can be found in the `api_specs` directory and include:

- `openapi.yaml`: Main OpenAPI file with common components
- `auth.yaml`: Authentication endpoints
- `profile.yaml`: User profile endpoints
- `workout.yaml`: Workout plan endpoints
- `nutrition.yaml`: Nutrition plan endpoints

These specifications provide detailed information about:

- Available endpoints
- Request/response schemas
- Query parameters
- Authentication requirements
- Possible error responses

## Conclusion

This API overview provides a high-level understanding of the DoD Fitness App Backend Service API. For detailed endpoint specifications, request/response schemas, and examples, refer to the OpenAPI files in the `api_specs` directory. The API is designed to be secure, efficient, and scalable, providing a robust foundation for the DoD Fitness App ecosystem.