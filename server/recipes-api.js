var express = require('express');
var router = express.Router();
const multer = require('multer');
const recipesController = require('./recipesController');
const RecipeService = recipesController.RecipeService;
const upload = multer({
    dest: "./uploads"
});


router.use((req, res, next) => {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Access-Control-Allow-Headers',
    });
    if (req.method == 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});


// routing code

// list
router.get('/', (req, res, next) => {
    RecipeService.list()
        .then((recipes) => {
            console.log(`API: Found recipes: ${recipes}`);
            res.status(200);
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
            res.send(JSON.stringify(recipe));
        }).catch((err) => {
            res.status(404);
            res.send();
        });
});

// create
router.post('/:newRecipe', upload.single('file'), (req, res, next) => {
    console.log(req.file);
    //let path = "/static/img/" + req.file.filename;
    const recipe = {
        title: req.body.title,
        ingrediants: req.body.ingrediants,
        instructions: req.body.instructions,
        imageUrl: req.body.imageUrl
    }
    RecipeService.create(recipe)
        .then((recipe) => {
            res.status(200);
            res.send(JSON.stringify(recipe));
            console.log(`Added recipe ${recipe}`);
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
            console.log(`Updated recipe: ${updateRecipe}`);
        }).catch((err) => {
            res.status(404);
            res.end();
        });

});


//  delete
router.delete('/:recipeid', (req, res, next) => {
    RecipeService.delete(req.params.recipeid)
        .then((recipe) => {
            res.status(200);
            res.send(JSON.stringify(recipe));
            console.log("Deleted recipe");
        }).catch((err) => {
            res.status(404);
            res.end();
        });
});

// export our router
module.exports = router;