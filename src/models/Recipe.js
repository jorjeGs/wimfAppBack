const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
    title: String,
    recipeid: String,
    readyIn: String,
    image: String,
    description: String,
    preparation: String,
    ingredients: [
        {
            name: String,
            image: String,
            usage: String,
            amount: Number,
            unit: {
                type: String,
                default: "pieces",
            },
        }
    ],
    steps: [
        {
            number: Number,
            step: String
        }
    ],

}, {
    timestamps: true
});

module.exports = model('Recipe', recipeSchema);