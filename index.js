const express = require('express')
const app = express()
const cors = require('cors')
const Swagger = require('./Swagger.json')
const SwaggerUI = require("swagger-ui-express")
const mongoose = require('mongoose')
const MathModel = require('./model/MathModel')
const bodyparser = require('body-parser')
const jwt = require('jsonwebtoken')
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

const secretKey = "Haeykcoromus"
let token = jwt.sign({name:"Win"},secretKey)

const verifyToken = (req,res,next)=>{
    let auth = req.headers.authorization
    if(!token){
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try{
        auth = auth.split(" ")[1]
        let decode = jwt.verify(auth,secretKey)
        req.name = decode
        next()
    }catch(err){
        res.send("Wrong Auth")
        console.log(err);
    }
    
}

app.get("/gentoken/:name",(req,res)=>{
    let { name } = req.params
    //console.log(name);
    token = jwt.sign({name},secretKey)
    res.send(token)
})

app.get("/checktoken",verifyToken,(req,res)=>{
    let {name} = req.name 
    res.send(`You are ${name}`)
})



app.get("/api/rootofequation/:topic",async(req,res)=>{
    let { topic } = req.params
    let find = await MathModel.find({topic:`${topic}`})
    res.json(find)
    
})


app.post("/api/postdata",(req,res)=>{
    console.log(req.body);
    let {value,equation,xl,xr,label,group,topic} = req.body
    MathModel.create({value,equation,xl,xr,label,group,topic})
    res.send({ status: 'SUCCESS' })
})

    

app.use("/docs",SwaggerUI.serve,SwaggerUI.setup(Swagger))

app.listen(5000,()=>{
    console.log('Listening on port 5000');
})
