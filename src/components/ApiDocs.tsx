import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const ApiDocs: React.FC = () => {
  const spec = {
    openapi: '3.0.0',
    info: {
      title: 'Workout & Nutrition Planner API',
      version: '1.0.0',
      description: 'API for managing workout and nutrition plans',
    },
    paths: {
      '/workout-plans': {
        post: {
          summary: 'Create a new workout plan',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    goal: { type: 'string' },
                    fitnessLevel: { type: 'string' },
                    daysPerWeek: { type: 'integer' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      plan: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/nutrition-plans': {
        post: {
          summary: 'Create a new nutrition plan',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    goal: { type: 'string' },
                    dietaryRestrictions: { type: 'string' },
                    calorieTarget: { type: 'integer' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      plan: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">API Documentation</h2>
      <SwaggerUI spec={spec} />
    </div>
  );
};

export default ApiDocs;