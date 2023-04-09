const express = require('express')
const app = express()
const cors = require('cors')
const SwaggerUI = require("swagger-ui-express")
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
require('dotenv').config()
/*----------------------------------------------------------------------*/
/* Additional files */
const MathModel = require('./model/MathModel')
const AccountModel = require('./model/UserModel')
const Swagger = require('./Swagger.json')
/*----------------------------------------------------------------------*/

/* Config */
const {MONGO_USERNAME,MONGO_PASSWORD} = process.env;
mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.cfglwqy.mongodb.net/?retryWrites=true&w=majority`)
.then(()=> console.log('connection success!'))
.catch((err)=>console.error(err))

const corsOption = {
    origin:"http://localhost:3000",
    credentials:true
}

app.use(cookieParser())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors(corsOption))
/*----------------------------------------------------------------------*/
/* Token Function */
const secretKey = "Haeykcoromus"
let token = jwt.sign({username:"Win"},secretKey)

const verifyToken = (req,res,next)=>{
    
    let auth = req.headers.authorization
    console.log(auth);
    if(auth === 'undeined'){
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try{
        if(auth.startsWith("Bearer")){
            auth = auth.split(" ")[1]
        }
        // auth = auth.split(" ")[1]
        let decode = jwt.verify(auth,secretKey)
        req.username = decode
        next()
    }catch(err){
        res.send("Token is not correct!")
        console.log(err);
    }
    
}
/* Hash Function */
const makeHash = async(password)=>{
    const result = await bcrypt.hash(password,10);
    return result;
}

const decodeHash = async(password,hash)=>{
    const result = await bcrypt.compare(password,hash)
    return result
}

/*---------------------------------------------------------------------------------*/
/* Gennerate token from name  */
app.get("/gentoken/:username",(req,res)=>{
    let { username } = req.params
    token = jwt.sign({username},secretKey)
    res.send(token)
})


/* Check token  */
app.get("/checktoken",verifyToken,(req,res)=>{
    let {username} = req.username
    res.send(`You are ${username}`)
})

/*---------------------------------------------------------------------------------*/
/* register api */
app.post("/register",(req,res)=>{
    let { username , password } = req.body
    makeHash(password)
        .then((password)=>{
            AccountModel.create({username,password})
            res.send(`Success Your hash is : ${password}`)
        })
        .catch((err)=>{
            console.log(err);
        })
    
})
/* login */
app.post("/login",async (req,res)=>{
    let { username , password } = req.body
    let find = await AccountModel.findOne({username:`${username}`})
    if(!find){
        res.status(401).send({status:false})
    }else{
        console.log(find);
        let hashPassword = find.password
        decodeHash(password,hashPassword)
            .then((result)=>{
                if(result){
                    console.log("password is correct.");
                    token = jwt.sign({username},secretKey)
                    console.log("gen token " + token);
                    res.cookie('token',`${token}`)
                    res.status(200).send(token)
                }else{
                    res.status(401).send({status:"Password is not correct"})
                    console.log("password is not correct.");
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
})

app.get("/api/rootofequation/:topic?",async(req,res)=>{
    let find
    if(req.params.topic){
        let { topic } = req.params
        find = await MathModel.find({topic:`${topic}`})
    }else{
        find = await MathModel.find()
    }
    res.json(find)
    
})



app.post("/api/postdata",verifyToken,(req,res)=>{
    
    console.log(req.body);
    let { value, equation, xl, xr, label, group, topic } = req.body
    MathModel.create({value,equation,xl,xr,label,group,topic})
    res.send({ status: 'SUCCESS' })
})

    

app.use("/docs",SwaggerUI.serve,SwaggerUI.setup(Swagger))

app.listen(5000,()=>{
    console.log('Listening on port 5000');
})
