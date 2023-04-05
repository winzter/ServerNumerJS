const mongoose = require('mongoose')

const MathSchema = new mongoose.Schema({
    equation:String,
    xl:Number,
    xr:Number
})
