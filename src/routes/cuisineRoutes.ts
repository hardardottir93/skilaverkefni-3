import express from 'express';
import { createCuisineController, deleteCuisineController, getAllCuisinesController, updateCuisineController } from '../controllers/cuisineController';
import { validate, validateParams } from "../middleware/validate";
import { CuisineIdParams, CreateCuisineSchema, UpdateCuisineSchema } from '../schemas/cuisineSchema';
import { getRecipesByCuisineController } from '../controllers/recipeController';
import { getCuisineById } from '../models/cuisineModel';

const router = express.Router();

router.get('/', getAllCuisinesController);
router.get('/:id', getCuisineById);
router.get('/:id/recipes', validateParams(CuisineIdParams), getRecipesByCuisineController);
router.post('/', validate(CreateCuisineSchema),createCuisineController);
router.put('/:id', validate(UpdateCuisineSchema), updateCuisineController);
router.delete('/:id', validateParams(CuisineIdParams), deleteCuisineController);

export default router;