const { Router } = require('express');
const router = Router();

const { getIngredients, createIngredient, deleteIngredient  } = require('../controllers/ingredients.controller');

router.route('/')
    .get(getIngredients)
    .post(createIngredient);

router.route('/:id')
    .delete(deleteIngredient);

module.exports = router;