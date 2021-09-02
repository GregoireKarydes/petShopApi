const { json } = require('body-parser');
const express = require('express');
const PetModel = require('../models/pet');
const router = express.Router();

// Routes /pets/type to filter by type

router.get('/type', (req, res) => {
    const myFilter = req.query.type;
    PetModel.find({type : myFilter}, (err, docs) => {
        if(!err) res.status(200).send(docs)
        else res.status(400).send('Error during the request to filter', err)
    }) 
})


// Routes /pets/status to filter by status

router.get('/status', (req, res) => {
    const myFilter = req.query.status;
    PetModel.find({status : myFilter}, (err, docs) => {
        if(!err) res.status(200).send(docs)
        else res.status(400).send('Error during the request to filter', err)
    }) 
})

// routes /pets

router.get('/', (req, res ) => {
    PetModel.find((err, docs) => {
        if(!err) res.status(200).json(docs)
        else res.status(400).json('Error during the request get'+ err.message)
    })
})


router.post('/', (req, res) => {
    const myNewPet = new PetModel({
        name : req.body.name,
        status : req.body.status,
        type : req.body.type,
        image : req.body.image
    });
    myNewPet.save()
    res.status(201).json(myNewPet)
})

// routes /pets/{id}

router.get('/:id', (req, res) => {
    let id = req.params.id;
    PetModel.findById({ _id: id }, (err, docs) => {
        if(!err) res.status(200).json(docs)
        else if(docs ==undefined) res.status(404).json('Error 404 : Id unknown');
        else res.status(401).send('Error during the')
    })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    PetModel.findByIdAndRemove({ _id: id }, (err, docs) => {
        if(!err) res.send('deleted')
        else if(docs ==undefined) res.status(404).json('Error 404 : Id unknown');
        else res.status(404).json('Error during the request get pet/{id}' + err.message)
    })
})

router.put('/:id', (req, res) => {
    let update = {
        name : req.body.name,
        status : req.body.status,
        type : req.body.type,
        image : req.body.image
    }
    let id = req.params.id;
    console.log(update)
    PetModel.findByIdAndUpdate({ _id: id }, 
        { $set: update},{new: true }, (err, docs) => {
          if (!err) res.json(docs);
          else console.log("Update error : " + err);
    })
})

// route /pets/{petId}/image using to Add an image to a pet

router.post('/:id/image', (req, res) => {

    let id = req.params.id;
    let newImage = {
        image : req.body.image
    }

    PetModel.findByIdAndUpdate({ _id: id }, 
        { $set: newImage},{new: true }, (err, docs) => {
          if (!err) res.json(docs);
          else console.log("Error during the image post operation " + err);
    })
})

module.exports = router;
