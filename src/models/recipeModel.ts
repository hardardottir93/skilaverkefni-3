import db from '../config/db.js';

export interface  Recipe {
  id?: number;
  title: string;
  description: string;
  cook_time_minutes: number;
  difficulty: string;
  rating: number;
  created_at?: Date;
  cuisine_id?: number;
};

export const getAllRecipes = async (): Promise<Recipe[]> => {
  return await db.any(
    `SELECT
        r.*,
        c.name AS cuisine_name
     FROM recipes r
     JOIN cuisines c ON c.id = r.cuisine_id`
  );
};

export const getRecipeById = async (id: number): Promise<Recipe | null> => {
  return await db.oneOrNone(
    `SELECT 
        r.*, 
        c.name AS cuisine_name 
      FROM recipes r 
      JOIN cuisines c ON c.id = r.cuisine_id
      WHERE r.id = $1`,
    [id]
  );
};

export const createRecipe = async (recipe: Recipe): Promise<Recipe> => { 
  return await db.one( 
    `
    WITH inserted AS (
      INSERT INTO recipes (
        title, 
        description, 
        cook_time_minutes, 
        difficulty, 
        rating, 
        cuisine_id
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    )
    SELECT 
      i.*,
      c.name AS cuisine_name
    FROM inserted i
    JOIN cuisines c ON c.id = i.cuisine_id
    `,
    [recipe.title, recipe.description, recipe.cook_time_minutes, recipe.difficulty, recipe.rating, recipe.cuisine_id] 
  ); 
};

export const deleteRecipe = async (id: number): Promise<Recipe | null> => {
  return await db.oneOrNone('DELETE FROM recipes WHERE id = $1 RETURNING *', [id]);
    
};

export const getRecipesByCuisine = async (id: number): Promise<Recipe[]> => {
  return await db.any(
    `SELECT 
        r.*, 
        c.name AS cuisine_name 
      FROM recipes r 
      JOIN cuisines c ON c.id = r.cuisine_id
      WHERE c.id = $1`,
    [id]
  );
};



export const updateRecipe = async (id: number, recipe: Recipe): Promise<Recipe | null> => {
  return await db.oneOrNone(
    `
    WITH updated AS (
      UPDATE recipes
      SET
        title = $1,
        description = $2,
        cook_time_minutes = $3,
        difficulty = $4,
        rating = $5,
        cuisine_id = $6
      WHERE id = $7
      RETURNING *
    )
    SELECT 
      u.*,
      c.name AS cuisine_name
    FROM updated u
    JOIN cuisines c ON c.id = u.cuisine_id;
    `,
    [
      recipe.title,
      recipe.description,
      recipe.cook_time_minutes,
      recipe.difficulty,
      recipe.rating,
      recipe.cuisine_id,
      id
    ]
  );
};

export const searchRecipes = async (q: string) => {
  return db.any(
    `
      SELECT 
        r.*, 
        c.name AS cuisine_name
      FROM recipes r
      JOIN cuisines c ON c.id = r.cuisine_id
      WHERE LOWER(r.title) LIKE LOWER($1)
    `,
    [`%${q}%`]
  );
};