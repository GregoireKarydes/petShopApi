const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    petId : {
        required : true,
        type : String
    },
    quantity : {
        required : true,
        type : Number
    },
    shipDate : {
        required : true,
        type : Date
    },
    status : {
        type : String,
        required : true,
        enum : ["placed","approved","delivered"]
}}, {timestamps : true})

const OrderModel = mongoose.model('store/order', OrderSchema)

module.exports = OrderModel