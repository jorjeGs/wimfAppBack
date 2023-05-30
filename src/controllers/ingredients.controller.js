const ingredientCtrl = {};

const Ingredient = require('../models/Ingredients');

ingredientCtrl.getIngredients = async (req, res) => {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
}
ingredientCtrl.createIngredient = async (req, res) => {
    const { name, imgurl } = req.body;
    const newIngredient = new Ingredient({name: name, imgurl: imgurl});
    console.log(newIngredient);
    await newIngredient.save();
    res.json({message: 'Ingredient created'});
}
ingredientCtrl.deleteIngredient = async (req, res) => {
    await Ingredient.findByIdAndDelete(req.params.id);
    res.json({message: 'Ingredient Deleted'})
}


module.exports = ingredientCtrl;