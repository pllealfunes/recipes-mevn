require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const recipesApi = require('./recipes-api');

server.use(express.json());
server.use(cors());

const mongoose = require('mongoose');
mongoose.connect(process.env.dbURI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

server.use('/apia/recipes', recipesApi);

server.get("/", (req, res) => {
    res.send("Hello World!");
})

server.listen(3000, () => console.log("Server started!"));