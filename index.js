const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:1234@cluster0.cfglwqy.mongodb.net/?retryWrites=true&w=majority')
    .then(()=> console.log('connection success!'))
    .catch((err)=>console.error(err))

const corsOption = {
    origin:"http://localhost:3000",
    credentials:true
}

const data = [
    {
        "value":`{
            "index":"0",
            "label": "(x^4)-13",
            "xl":"0",
            "xr":"2"
        }`,
        "label": '(x^4)-13',
    },
    {
        "value":`{
            "index":"1",
            "label": "(x^2)-7",
            "xl":"1",
            "xr":"2"
        }`, 
        "label": '(x^2)-16',
    }
]

app.use(cors(corsOption))

app.get('/',(req,res)=>{
    res.send(data)
})

app.listen(5000,()=>{
    console.log('Listening on port 5000');
})