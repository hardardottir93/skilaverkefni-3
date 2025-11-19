import express from 'express';
import { getRecipesByCuisine } from '../models/cuisineModel';
import { createCuisineController, deleteCuisineController, getCuisines, updateCuisineController } from '../controllers/cuisineController';
const router = express.Router();

//Ekki rétt, á eftir að uppfæra

router.get('/', getCuisines);
router.get('/:id/recipes', getRecipesByCuisine);
router.post('/', createCuisineController);
router.put('/:id', updateCuisineController);
router.delete('/:id', deleteCuisineController);

export default router;