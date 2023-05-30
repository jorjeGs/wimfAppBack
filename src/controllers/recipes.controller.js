const axios = require('axios');

const recipesCtrl = {};

const Recipe = require('../models/Recipe');

recipesCtrl.getRecipes = async (req, res) => {
    const recipes = await Recipe.find();
    res.json(recipes);
}
//getOptions............... usando Searchbyingredientes, regresa json posibles results, en front usar map key{key.id}
//en su reqbody optiene los parametros ingredients (, separated), number of recipes (limitar a 5 por  mientras)
//MEJOR DESDE EL FRONT, IGUAL NO GUARDARE NADA NO TIENE SENTIDO HACERLO DESDE AQUI

//obtiene datos de la api y crea recetas apartir del json enviado desde el cliente con ID de Recipe, 
//esto despues de que el usuario elige entre las propuestas consultadas desde getPossibleRecipes 
recipesCtrl.createRecipe = async (req, res) => {
    const {recipeid} = req.body;
    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/' + recipeid + '/information',
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
      };    
    try {
        const recipedetails = await axios.request(options);
        console.log(recipedetails.data.title);
        
        //creacion de modelo con datos que no necesitan ser seleccionados
        const newRecipe = new Recipe({
            title: recipedetails.data.title,
            recipeid: recipedetails.data.id,
            readyIn: recipedetails.data.readyInMinutes,
            image: recipedetails.data.image,
            description: recipedetails.data.summary,
            preparation: recipedetails.data.instructions,
        })

        //obtencion de elementos seleccionados en extendedIngredients
        for(let i = 0; i < recipedetails.data.extendedIngredients.length; i++) {

            const ingredient = {
                name: recipedetails.data.extendedIngredients[i].name,
                image: 'https://spoonacular.com/cdn/ingredients_100x100/' + recipedetails.data.extendedIngredients[i].image,
                usage:  recipedetails.data.extendedIngredients[i].originalName,
                amount: Number(recipedetails.data.extendedIngredients[i].amount),
                unit: recipedetails.data.extendedIngredients[i].unit
            }
            newRecipe.ingredients.push(ingredient);
        }

        /*
        for(let i = 0; i < recipedetails.data.analyzedInstructions[0].steps.length; i++) {

            const step = {
                number: Number(recipedetails.data.analyzedInstructions[0].steps[i].number),
                step: recipedetails.data.analyzedInstructions[0].steps[i].step
            }
            newRecipe.steps.push(step);
        }
        */
        await newRecipe.save();
        
        res.json(newRecipe)
        console.log(newRecipe)

    } catch (error) {
        console.error(error);
        console.log('Error de conexion a la API de Spoonacular')
    }
}

recipesCtrl.getRecipe = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.json(recipe)

}

recipesCtrl.deleteRecipe = async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({message: 'Recipe Deleted'})
}
//agregar getRecipesByUserID?............o, ya que se usara populate
//entonces, con el getUserID, usando populate, mapeo las recipes con opciones para el menu de recetas, despues con get getRecipe para vista detallada
//ademas de agregar un put method para agregar recipes a un userID

module.exports = recipesCtrl;