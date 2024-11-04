const mongoose = require('mongoose')
const { Schema } = mongoose

const ActivitySchema = new Schema({
    ActivityReson: {
        type:String
    },
    role:{
        type:String
    }
   

},{timestamps:true})

const Activity = mongoose.model('Activity',ActivitySchema)
module.exports = Activity