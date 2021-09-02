const express = require('express');
const router = express.Router()
const UserModel = require('../models/user');
const { get } = require('./pets.routes');

let userConnected = false;
let userIDConnected;



// routes login et logout

router.get('/login' , (req, res) => {
    const username = req.query.username
    const password = req.query.password

    UserModel.findOne({username : username, password : password}, (err, docs) => {
        if(!err) {
            res.status(200).send(docs)
            userConnected = true;
            userIDConnected = docs._id
            etablishConnexion()
        
        }
        else res.status(400).send('error during the login')
    })

})

router.get('/logout', (req,res) => {
    res.send('deconnected');
    userConnected = false;
    userIDConnected ="";
})


// routes /users

router.post('/', (req, res) => {
    const myNewUser = new UserModel({
        username : req.body.username,
        lastname : req.body.lastname,
        firstname : req.body.firstname,
        mail : req.body.mail,
        password : req.body.password,
        phone : req.body.phone
    })

    myNewUser.save()
    res.status(201).json(myNewUser)
})


router.get('/', (req,res) => {
    UserModel.find((err, docs) => {
        if(!err) res.status(200).send(docs)
        else res.status(400).send('error during the get at /users : ' + err )
    })
})

// routes /users/{username}


router.get('/:username', (req,res) => {
    const user = req.params.username;
    UserModel.find({username : user}, (err, docs) => {
        if(!err) res.status(200).send(docs)
        else res.status(400).res.send('Error during the request to see a specific user :  ' + err)

    })
})

router.delete('/:username', (req,res) => {
    const user = req.params.username;
    UserModel.findOneAndRemove({username : user}, (err, docs) => {
        if(!err) res.json('Deleted')
        else res.status(400).res.send('error during the deleting request :   '+ err)
    })
})

router.put('/:username' , (req, res) => {
    const user = req.params.username;
    const update = {
        username : req.body.username,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        mail : req.body.mail,
        phone : req.body.phone,
        password : req.body.password
    }
    UserModel.findOneAndUpdate({username : user}, {$set : update}, {new : true}, (err, docs) => {
        if(!err) res.status(201).send(docs)
        else res.status(400).send(err)
    })
})


module.exports = router;
