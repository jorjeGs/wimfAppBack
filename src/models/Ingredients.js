const { Schema, model } = require('mongoose');

const ingredientSchema = new Schema({
    name: String,
    imgurl: String

}, {
    timestamps: true
});

module.exports = model('Ingredient', ingredientSchema);