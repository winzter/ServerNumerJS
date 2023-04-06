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
        "value":"Equation1",
        "xl":"0",
        "xr":"2",
        "label":"(z^4)-13",
        "group":"Example From API"
    },
    {
        "value":"Equation2",
        "xl":"2",
        "xr":"5",
        "label":"(x^2)-16",
        "group":"Example From API"
    },
    {
        "value":"Equation3",
        "xl":"-1",
        "xr":"5",
        "label":"(x^2)-4",
        "group":"Example From API"
    },
    {
        "value":"Equation4",
        "xl":"5",
        "xr":"12",
        "label":"2x-20",
        "group":"Example From API"
    },
]

app.use(cors(corsOption))

app.get('/',(req,res)=>{
    res.send(data)
})

app.listen(5000,()=>{
    console.log('Listening on port 5000');
})