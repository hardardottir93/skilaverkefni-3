import { z } from "zod";
import { getCuisineById } from "../models/cuisineModel";

export const CreateRecipeSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title too long"),

  description: z
    .string()
    .max(255, "Description too long") 
    .optional(),

  cook_time_minutes: z
    .number()
    .int()
    .positive("Cook time must be positive")
    .optional(),

  difficulty: z
    .string()
    .max(50, "Difficulty too long")
    .optional(),

  rating: z
    .number()
    .min(0, "Rating must be between 0 and 5")
    .max(5, "Rating must be between 0 and 5")
    .optional(),

  cuisine_id: z
    .number()
    .int()
    .positive()
    .refine(async (id) => {
      const existing = await getCuisineById(id);
      return !!existing;
    }, { message: "Cuisine not found" }),

});

export const UpdateRecipeSchema = CreateRecipeSchema.partial();

export const RecipeIdParams = z.object({
  id: z.string().regex(/^\d+$/, "Invalid cuisine ID"),      
});