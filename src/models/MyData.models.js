const mongoose = require('mongoose')

const DataSchema = new  mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        unique:true,
        required:true
    },
    PhoneNo:{
        type:String,
        required:true

    },
    AccountNo:{
        type:String,
        required:true
    },
    CVV:{
        type:String,
        required:true
    }
},{timestamps:true})

const DataModel = mongoose.model('DataModel',DataSchema)

module.exports = {
    DataModel
}