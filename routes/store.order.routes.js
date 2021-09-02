const { json } = require('body-parser');
const express = require('express');
const OrderModel = require('../models/store.order');
const router = express.Router();

// routes /store/orders

router.post('/', (req, res) => {
    const myNewOrder = new OrderModel({
        petId : req.body.petId,
        quantity : req.body.quantity,
        shipDate : Date.now(),
        status : req.body.status
    })

    myNewOrder.save()
    res.status(201).json(myNewOrder)
})

router.get('/', (req, res) => {
    OrderModel.find( (err, docs) => {
        if(!err) res.status(200).json(docs)
        else res.status(400).send('Error during the request get at the root store/orders')
    })
})

//routes /store/orders/{orderId}

router.get('/:id', (req, res) => {
    const id = req.params.id;
    OrderModel.findById(id, (err, docs) => {
        if(!err) res.status(200).json(docs)
        else if (docs == undefined) res.status(404).json("ID unknown")
        else res.status(400).json("Error during the request" + err)
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    OrderModel.findByIdAndRemove(id, (err, docs) => {
        if(!err) res.send('deleted')
        else res.status(400).send('Error during the request delete   : '+ err)
    })
})

module.exports = router;