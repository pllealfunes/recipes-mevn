const fs = require('fs');
const path = require('path');
var express = require('express');
var router = express.Router();
const multer = require('multer');
const recipesController = require('./recipesController');
const RecipeService = recipesController.RecipeService;
const upload = multer({
    storage: recipesController.storage,
    fileFilter: recipesController.imageFilter
});


router.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Access-Control-Allow-Headers',
        'Content-type': 'application/json'
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
            res.json(recipes);
        }).catch((err) => {
            res.status(404);
            res.end();
        });
});


// find
router.get('/:recipeid', (req, res, next) => {
    RecipeService.find(req.params.recipeid)
        .then((recipe) => {
            console.log(`API: Found recipe: ${recipe}`);
            res.status(200);
            res.json(recipe);
        }).catch((err) => {
            res.status(404);
            res.end();
        });
});

// create
router.post('/:newRecipe', upload.single('imageUrl'), (req, res, next) => {
    if (req.file === undefined) {
        const recipe = {
            title: req.body.title,
            ingrediants: req.body.ingrediants,
            instructions: req.body.instructions,
        }
        RecipeService.create(recipe)
            .then((recipe) => {
                res.status(200);
                res.set({ 'Content-type': 'multipart/form-data' });
                console.log(`Added recipe ${recipe}`);
                res.json(recipe);
            }).catch((err) => {
                //console.log(err);
                res.status(404);
                res.end();
            });
    } else {
        const path = "/public/images/" + req.file.filename;
        const recipe = {
            title: req.body.title,
            ingrediants: req.body.ingrediants,
            instructions: req.body.instructions,
            imageUrl: path
        }
        RecipeService.create(recipe)
            .then((recipe) => {
                res.status(200);
                res.set({ 'Content-type': 'multipart/form-data' });
                console.log(`Added recipe ${recipe}`);
                res.json(recipe);
            }).catch((err) => {
                fs.unlinkSync(`.${path}`);
                res.status(404);
                res.end();
            });
    }
});

//update
router.put('/updateRecipe/:recipeid', (req, res, next) => {
    console.log(req.body);
    const recipe = req.body;
    RecipeService.update(req.params.recipeid, recipe)
        .then((updateRecipe) => {
            res.status(200);
            res.json(updateRecipe);
            console.log(`Updated recipe: ${updateRecipe}`);
        }).catch((err) => {
            res.status(404);
            res.end();
        });
});


//  delete recipe
router.delete('/:recipeid', (req, res, next) => {
    RecipeService.delete(req.params.recipeid)
        .then((recipe) => {
            res.status(200);
            res.send(recipe);
            console.log("Deleted recipe");
        }).catch((err) => {
            res.status(404);
            res.end();
        });
});

router.put('/removeImage/:recipeId', (req, res, next) => {
    fs.unlinkSync(`.${req.body.imageUrl}`);
    let recipe = {
        imageUrl: undefined
    }
    RecipeService.update(req.params.recipeId, recipe)
        .then((removeImage) => {
            res.status(200);
            res.json(removeImage);
        }).catch((err) => {
            res.status(404);
            res.end();
        });
});

router.put('/updatePhoto/:recipeId', upload.single('imageUrl'), (req, res, next) => {
    const path = "/public/images/" + req.file.filename;
    let recipe = {
        imageUrl: path,
    }
    RecipeService.update(req.params.recipeId, recipe)
        .then((updatePhoto) => {
            console.log(updatePhoto);
            res.status(200);
            res.json(updatePhoto);
        }).catch((err) => {
            res.status(404);
            res.end();
        });
});

// export our router
module.exports = router;