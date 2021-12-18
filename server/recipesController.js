class RecipeService {
    //  list
    static list() {
        return recipe.find({})
            .then((recipes) => {
                return recipes;
            });
    }
    //  find

    //  create

    //  update

    //  delete
}
module.exports.RecipeService = RecipeService;