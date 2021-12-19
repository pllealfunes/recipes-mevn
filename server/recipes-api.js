var express = require('express');
var router = express.Router();
const recipesController = require('./recipesController');
const RecipeService = recipesController.RecipeService;

// routing code

// list
router.get('/', (req, res, next) => {
    RecipeService.list()
        .then((recipes) => {
            console.log(`API: Found recipes: ${recipes}`);
            res.status(200);
            res.set({ 'Content-type': 'application/json' })
            res.send(JSON.stringify(recipes));
        }).catch((err) => {
            res.status(404);
            res.send();
        });
});


// find
router.get('/:recipeid', (req, res, next) => {
    RecipeService.find(req.params.recipeid)
        .then((recipe) => {
            console.log(`API: Found recipe: ${recipe}`);
            res.status(200);
            res.set({ 'Content-Type': 'application/json' })
            res.send(JSON.stringify(recipe));
        }).catch((err) => {
            res.status(404);
            res.send();
        });
});

// create
router.post('/:newRecipe', (req, res, next) => {
    const recipe = {
        title: req.body.title,
        ingrediants: req.body.ingrediants,
        instructions: req.body.instructions
    }
    RecipeService.create(recipe)
        .then((recipe) => {
            res.status(200);
            res.set({ 'Content-Type': 'application/json' })
            res.send(JSON.stringify(recipe));
        }).catch((err) => {
            res.status(404);
            res.send();
        });
});

//update
router.put('/updateRecipe/:recipeid', (req, res, next) => {
    let data = req.body;
    RecipeService.update(req.params.recipeid, data)
        .then((updateRecipe) => {
            res.status(200);
            res.json(updateRecipe);
        }).catch((err) => {
            res.status(404);
            res.end();
        });

});


//  delete
router.delete('/:recipeid', (req, res, next) => {
    let id = req.params.recipeid;
    RecipeService.delete(req.params.recipeid)
        .then((recipe) => {
            res.status(200);
            res.send(JSON.stringify(recipe));
        }).catch((err) => {
            res.status(404);
            res.end();
        });
});

// export our router
module.exports = router;
