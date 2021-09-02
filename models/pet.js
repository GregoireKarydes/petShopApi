const mongoose = require("mongoose");

const PetSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : false
    },
    status : {
        type : String,
        required : true,
        enum : ['available','sold', 'toYoung']
    },
    type : {
        type : String,
        required : true
    },
   }, { timestamps: true })

const PetModel = mongoose.model('pet', PetSchema)

module.exports = PetModel;
