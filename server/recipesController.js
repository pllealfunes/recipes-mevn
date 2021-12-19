const Recipe = require('./models/recipeSchema');


class RecipeService {
    //  list
    static list() {
        return Recipe.find({})
            .then((recipes) => {
                return recipes;
            });
    }
    //  findOne
    static find(id) {
        return Recipe.findById(id)
            .then((recipe) => {
                return recipe;
            });
    }
    //  create
    static create(obj) {
        var recipe = new Recipe(obj);
        return recipe.save();
    }

    //  update
    static update(id, data) {
        return Recipe.findById(id)
            .then((recipe) => {
                recipe.set(data);
                recipe.save();
                return recipe;
            });
    }

    //  delete
    static delete(id) {
        return Recipe.deleteOne({ _id: id })
            .then((obj) => {
                return obj;
            })
    }
}
module.exports.RecipeService = RecipeService;