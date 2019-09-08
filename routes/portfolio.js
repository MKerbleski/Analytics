const express = require('express');
const knex = require('knex');

const dbEngine = process.env.ENV || 'development';
const dbConfig = require('../knexfile.js')[dbEngine];
const db = knex(dbConfig);
const router = express.Router();

router.use(express.json());

function saveData(data){
    return db('portfolio')
        .insert({uuid: data.session.uuid, data: JSON.stringify(data)})
}

function getData(uuid){
    if(uuid){
        return db('portfolio')
            .where('uuid', uuid)
    } else {
        return db('portfolio')
    }
}

function updateData(data){
    return db('portfolio')
        .update({data: JSON.stringify(data)})
        .where('uuid', data.session.uuid)
}

function getSession(uuid){
    return db('portfolio')
        .where('uuid', uuid).first()
}

router.post('/', async (req, res, next) => {
    getSession(req.body.session.uuid).then(priorSession => {
        if(priorSession){
            console.log('priorSession', priorSession)
            let oldData = priorSession.data
            console.log('oldData', oldData)
            let oldTracker = oldData.tracker
            console.log('oldTracker', oldTracker)
            req.body.tracker.unshift(...oldTracker)
            console.log('req.body', req.body)
                updateData(req.body).then(response => {
                    console.log('user session update')
                    res.status(200).json({ message: 'data update'})
                }).catch(err => {
                    console.log('error saving session data', err)
                })
        } else {
            saveData(req.body).then(response => {
                console.log('New session saved', Date.now())
                res.status(200).json({ message: 'data saved'})
            }).catch(err => {
                console.log('error saving session data', err)
            })
        }
    }).catch(err => {
        console.log('err', err)
    })
}) 

router.get('/', (req, res) => {
    getData().then(response => {
        console.log('Returned data from DB')
        res.status(200).json(response)
    }).catch(err => {
        console.log('err fetching data from DB', err)
    })
})

module.exports = router