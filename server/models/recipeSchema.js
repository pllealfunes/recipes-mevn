var mongoose = require("mongoose");

const Schema = mongoose.Schema;
let recipeSchema = new Schema({
    //user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, minLength: 5, required: true },
    ingrediants: { type: String, minLength: 10, required: true },
    instructions: { type: String, minLength: 10, required: true },
    imageUrl: { type: String },
});


module.exports = mongoose.model("Recipe", recipeSchema);