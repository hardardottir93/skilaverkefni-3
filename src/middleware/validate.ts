import { Request, Response, NextFunction } from 'express';
import z, { ZodError } from 'zod';

/**
 * Validate the request body
 * @param schema - The Zod schema to validate the request body against
 * @returns A middleware function that validates the request body
 */
export const validate = (schema: z.ZodSchema) => {
  return async (request: Request, response: Response, next: NextFunction) => {
     try {
      await schema.parseAsync(request.body);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        // SINGLE ERROR
        if (error.issues.length === 1) {
          return response.status(400).json({
            error: error.issues[0].message,
          });
        }

        // MULTIPLE ERRORS
        return response.status(400).json({
          error: "Validation failed",
          details: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      console.error("Unexpected validation error:", error);
      return response.status(500).json({ error: "Validation middleware failed" });
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
