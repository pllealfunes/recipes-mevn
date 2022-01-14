const Recipe = require('./models/recipeSchema');

var multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const imageFilter = function (req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
    } else {
        cb(new Error("OnlyImageFilesAllowed"), false);
    }
}


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

module.exports.storage = storage;
module.exports.imageFilter = imageFilter;
module.exports.RecipeService = RecipeService;