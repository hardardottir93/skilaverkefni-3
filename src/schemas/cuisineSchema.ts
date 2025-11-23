import { z } from 'zod';

// Create CuisineSchema
export const CreateCuisineSchema = z.object({
    name: z.string().min(1, "Name is required").max(255, "Name too long"),
});

export const UpdateCuisineSchema = CreateCuisineSchema.partial();

// Validate Cusine ID
export const CuisineIdParams = z.object({
  id: z.string().regex(/^\d+$/, "Invalid cuisine ID"),      
});

