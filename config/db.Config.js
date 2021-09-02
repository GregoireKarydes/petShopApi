const mongoose = require('mongoose');
require('dotenv').config()

const userID = process.env.DB_LOG

mongoose
    .connect('mongodb+srv://'+userID+'@cluster0.ym4j6.mongodb.net/petshop',
    {useNewUrlParser : true,
    useUnifiedTopology: true},
    (err) => {
    if(!err) console.log('Connected to MongoDB')
    else console.log("Error during the connection with the DB", err)
})