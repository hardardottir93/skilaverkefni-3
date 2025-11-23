import { Request, Response } from 'express';
import { createRecipe, deleteRecipe, getAllRecipes, getRecipeById, getRecipesByCuisine, searchRecipes, updateRecipe } from '../models/recipeModel';
import { getCuisineById } from '../models/cuisineModel';


export const getRecipesOrSearchController = async (req: Request, res: Response): Promise<void> => {
  try {
    const q = req.query.q;

    // CASE 1: q is provided, but empty → error
    if (q !== undefined && (typeof q !== "string" || q.trim() === "")) {
      res.status(400).json({error: "Search query is required"});
      return;
    }

    // CASE 2: q exists and has value → search mode
    if (typeof q === "string" && q.trim().length > 0) {
      const recipes = await searchRecipes(q.trim());
      res.status(200).json({recipes});
      return;
    }

    // CASE 3: q does not exist → get all recipes
    const allRecipes = await getAllRecipes();
    res.status(200).json(allRecipes);

  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Something went wrong"
    });
  }
};

export const getRecipeByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const recipe = await getRecipeById(id);

  if (!recipe) {
      res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json(recipe);
    
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
};

export const getRecipesByCuisineController = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipe_id = parseInt(req.params.id);
    const cuisine_id = parseInt(req.params.id);
    const recipes = await getRecipesByCuisine(cuisine_id);

    const cuisine = await getCuisineById(cuisine_id);

    if (!cuisine) {
      res.status(404).json({ error: "Cuisine not found" });
      return;
    }

    res.status(200).json(recipes);

  } catch (error) {
    console.error('Error fetching recipes', error);
    res.status(500).json({ error: 'Failed to fetch recipice' });
  }
};


export const createRecipeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, cook_time_minutes, difficulty, rating, cuisine_id } = req.body;

    if (!title) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }
    if (!cuisine_id) {
      res.status(400).json({ error: 'Cuisine is required' });
      return;
    }
    
    const insertedRecipe = await createRecipe({
      title, description, cook_time_minutes, difficulty, rating, cuisine_id
    });

    res.status(201).json(insertedRecipe);

  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
};


export const updateRecipeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid recipe ID" });
      return;
    }

    // 1. Check if recipe exists
    const existing = await getRecipeById(id);
    if (!existing) {
      res.status(404).json({ error: "Recipe not found" });
      return;
    }

    // 2. Merge old values + new values
    const merged = {
      ...existing,
      ...req.body
    };

    // 3. Update and fetch updated row with cuisine_name
    const updated = await updateRecipe(id, merged);

    // Should never be null now, but we keep check:
    if (!updated) {
      res.status(500).json({ error: "Recipe not found" });
    }

    // 4. SUCCESS → recipe object only
    res.status(200).json(updated);

  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};


export const deleteRecipeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid Recipe ID' });
      return;
    }

    const deletedRecipe = await deleteRecipe(id);
    if (!deletedRecipe) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }

    res.status(204).json();
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
};
