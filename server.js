const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('./config/db.Config');
require('dotenv').config();
const routerPets = require('./routes/pets.routes');
const routerStoreOrder = require('./routes/store.order.routes');
const routerUser = require('./routes/users.routes')

const PORT = process.env.PORT

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/v1/pets', routerPets)
app.use('/v1/store/orders', routerStoreOrder)
app.use('/v1/users', routerUser)


// Routes

app.get('/', (req, res) => {
    res.status(200).send('Welcome on the API')
})


// error 404 

app.use((req, res) => {
    res.status(404).send('Error 404')
})

// Server listening

app.listen(3000, () => {
    console.log('Server started on port ' + PORT )
})