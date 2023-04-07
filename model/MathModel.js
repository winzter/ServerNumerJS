const mongoose = require('mongoose')

const MathSchema = new mongoose.Schema({
    value:String,
    equation:String,
    xl:String,
    xr:String,
    x0:String,
    label:String,
    group:String,
    topic:String
})

const MathModel = mongoose.model('MathRootEquation',MathSchema)

module.exports = MathModel