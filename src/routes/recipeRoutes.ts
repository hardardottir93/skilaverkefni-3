import express from 'express';
import { createRecipeController, deleteRecipeController, getRecipeByIdController, getRecipesOrSearchController, updateRecipeController } from '../controllers/recipeController';
import { validate, validateParams } from '../middleware/validate';
import { CreateRecipeSchema, RecipeIdParams, UpdateRecipeSchema } from '../schemas/recipeSchema';

const router = express.Router();

router.get('/', getRecipesOrSearchController);
router.get('/:id', getRecipeByIdController);
router.post('/', validate(CreateRecipeSchema), createRecipeController);
router.put('/:id', validate(UpdateRecipeSchema), updateRecipeController);
router.delete('/:id', validateParams(RecipeIdParams), deleteRecipeController);


export default router;