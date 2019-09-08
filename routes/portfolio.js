const express = require('express');
const knex = require('knex');

const dbEngine = process.env.ENV || 'development';
const dbConfig = require('../knexfile.js')[dbEngine];
const db = knex(dbConfig);
const router = express.Router();

router.use(express.json());

function saveData(data){
    return db('portfolio')
        .insert({name: 'portfolio', data: JSON.stringify(data)})
}
function getData(){
    return db('portfolio')
    .where('name', 'portfolio')
}

router.post('/', async (req, res, next) => {
    saveData(req.body).then(response => {
        res.status(200).json({ message: 'data saved'})
    })
})

router.get('/', (req, res) => {
    getData(req.body).then(response => {
        res.status(200).json(response)
    })
})

module.exports = router