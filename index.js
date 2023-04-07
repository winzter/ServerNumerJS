const express = require('express')
const app = express()
const cors = require('cors')
const Swagger = require('./Swagger.json')
const SwaggerUI = require("swagger-ui-express")
const mongoose = require('mongoose')
const MathModel = require('./model/MathModel')
const bodyparser = require('body-parser')
require('dotenv').config()

const {MONGO_USERNAME,MONGO_PASSWORD} = process.env;

mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.cfglwqy.mongodb.net/?retryWrites=true&w=majority`)
.then(()=> console.log('connection success!'))
.catch((err)=>console.error(err))

const corsOption = {
    origin:"http://localhost:3000",
    credentials:true
}

app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors(corsOption))

app.get("/api/rootofequation/:topic",async(req,res)=>{
    let { topic } = req.params
    let find = await MathModel.find({topic:`${topic}`})
        res.json(find)
    
})


app.post("/api/postdata",async(req,res)=>{
    let {value,equation,xl,xr,label,group} = req.body
    await MathModel.create({value,equation,xl,xr,label,group})
    res.send({ status: 'SUCCESS' })
})

    

app.use("/docs",SwaggerUI.serve,SwaggerUI.setup(Swagger))
app.listen(5000,()=>{
    console.log('Listening on port 5000');
})
