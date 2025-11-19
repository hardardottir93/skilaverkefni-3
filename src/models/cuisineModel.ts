import db from '../config/db.js';

export interface  Cuisine {
  id?: number;
  name: string;
}

export const getAllCuisines = async (): Promise<Cuisine[]> => {
  return await db.query('SELECT * FROM cuisines');
};

export const getCuisineById = async (id: number): Promise<Cuisine[]> => {
  return await db.query('SELECT * FROM cuisines WHERE id = $1', [id]);
};


export const findCuisineByName = async (name: string): Promise<Cuisine | null> => {
  return await db.oneOrNone(
    'SELECT * FROM cuisines WHERE name = $1',
    [name]
  ); 
};

//Þarf að breyta - gera JOIN og skila Recipes
export const getRecipesByCuisine = async (id: number): Promise< Cuisine| null> => {
  return await db.oneOrNone('SELECT * FROM cuisines WHERE id = $1', [id]);
};

export const createCuisine = async (cuisine: Cuisine): Promise<Cuisine> => {
  return await db.one(
    'INSERT INTO cuisines (name) VALUES ($1) RETURNING *',
    [cuisine.name]
  );
};

export const deleteCuisine = async (id: number): Promise<Cuisine | null> => {
  return await db.oneOrNone('DELETE FROM cuisine WHERE id = $1 RETURNING *', [id]);
};

export const updateCuisine = async (id: number, cuisine: Partial<Cuisine>): Promise<Cuisine | null> => {
  const fields = [];
  const values = [];
  let paramCount = 1;

  if (cuisine.name !== undefined) {
    fields.push(`name = $${paramCount++}`);
    values.push(cuisine.name);
  }

  if (fields.length === 0) {
    return null;
  }

  values.push(id);
  const query = `UPDATE cuisines SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;

  return await db.oneOrNone(query, values);
};
