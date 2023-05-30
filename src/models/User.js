const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    recipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}]

}, {
    timestamps: true
});

module.exports = model('User', userSchema);