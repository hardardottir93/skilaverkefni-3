import { Request, Response } from 'express';
import { createCuisine, deleteCuisine, findCuisineByName, getAllCuisines, getCuisineById, updateCuisine } from '../models/cuisineModel';

export const getAllCuisinesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const cuisines = await getAllCuisines();
    res.json(cuisines);
  } catch (error) {
    console.error('Error fetching cuisines:', error);
    res.status(500).json({ error: 'Failed to fetch cuisines' });
  }
};

export const getCuisineByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const cuisines = await getCuisineById(id);
    res.json(cuisines);
    
  } catch (error) {
    console.error('Error fetching cuisine:', error);
    res.status(500).json({ error: 'Failed to fetch cuisine' });
  }
};


export const createCuisineController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    
    if (!name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }
    const existing = await findCuisineByName(name);
    if (existing) {
      res.status(400).json({
        error: 'Cuisine already exists',
        message: `Cuisine with name '${name}' already exists`,
      });
      return;
    }

    const newCuisine = await createCuisine({ name });

    res.status(201).json(newCuisine);

  } catch (error) {
    console.error('Error creating cuisine:', error);
    res.status(500).json({ error: 'Failed to create cuisine' });
  }
};


export const updateCuisineController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid cuisine ID' });
      return;
    }

    const {name } = req.body;
    const updatedCuisine = await updateCuisine(id, { name });

    if (!updatedCuisine) {
      res.status(404).json({ error: 'Cuisine not found' });
      return;
    }

    res.json(updatedCuisine);
  } catch (error) {
    console.error('Error updating Cuisine:', error);
    res.status(500).json({ error: 'Failed to update cuisine' });
  }
};


export const deleteCuisineController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid cuisine ID' });
      return;
    }

    const deletedCuisine = await deleteCuisine(id);
    if (!deletedCuisine) {
      res.status(404).json({ error: 'Cuisine not found' });
      return;
    }

    res.status(204).json();
  } catch (error) {
    console.error('Error deleting Cuisine:', error);
    res.status(500).json({ error: 'Failed to delete cuisine' });
  }
};