import { Request, Response, NextFunction } from 'express';
import z from 'zod';

/**
 * Validate the request body
 * @param schema - The Zod schema to validate the request body against
 * @returns A middleware function that validates the request body
 */
export const validate = (schema: z.ZodSchema) => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse(request.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Validate the request parameters
 * @param schema - The Zod schema to validate the request parameters against
 * @returns A middleware function that validates the request parameters
 */
export const validateParams = (schema: z.ZodSchema) => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse(request.params);
      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Validate the query parameters
 * @param schema - The Zod schema to validate the query parameters against
 * @returns A middleware function that validates the query parameters
 */
export const validateQuery = (schema: z.ZodSchema) => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse(request.query);
      next();
    } catch (error) {
      next(error);
    }
  };
};
