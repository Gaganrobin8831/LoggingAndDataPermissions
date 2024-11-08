const mongoose = require('mongoose')
const { Schema } = mongoose

const ActivitySchema = new Schema({
    ActionPerfom: {
        type:String
    },
    role:{
        type:String
    },
    newData:{
        type:[]
    },
    ActionType:{
        type:String
    },
    Name:{
        type:String
    }
   

},{timestamps:true})

const Activity = mongoose.model('Activity',ActivitySchema)
module.exports = Activity