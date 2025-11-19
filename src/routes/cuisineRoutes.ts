import express from 'express';
import { getRecipesByCuisine } from '../models/cuisineModel';
import { createCuisineController, deleteCuisineController, getCuisines, getOneCuisine, updateCuisineController } from '../controllers/cuisineController';
import { validate } from "../middleware/validate";
import { CuisineIdParams, CreateCuisineSchema } from '../schemas/cuisineSchema';

const router = express.Router();


router.get('/', getCuisines);
router.get('/:id',  getOneCuisine);
router.get('/:id/recipes', validate(CuisineIdParams), getRecipesByCuisine);
router.post('/', validate(CreateCuisineSchema),createCuisineController);
router.put('/:id', validate(CreateCuisineSchema), updateCuisineController);
router.delete('/:id', validate(CreateCuisineSchema), deleteCuisineController);

export default router;