const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:1234@cluster0.cfglwqy.mongodb.net/?retryWrites=true&w=majority')
    .then(()=> console.log('connection success!'))
    .catch((err)=>console.error(err))

app.get('/',(req,res)=>{
    res.send("HI")
})

app.listen(5000,()=>{
    console.log('Listening on port 5000');
})