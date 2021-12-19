require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const recipesApi = require('./recipes-api');

server.use(express.json());
server.use(cors());

const mongoose = require('mongoose');

mongoose.connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected")
},
    error => {
        console.log("Database could't be connected to: " + error)
    }
)

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api/recipes', recipesApi);


server.get("/", (req, res) => {
    res.send("Hello World!");
})

server.listen(3000, () => console.log("Server started!"));