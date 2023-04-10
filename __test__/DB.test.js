const mongoose = require('mongoose')
const AccountModel = require('../model/UserModel');
const MathModel = require('../model/MathModel');


describe("Connection", () => {
    beforeAll(async()=>{
        await mongoose.connect(`mongodb+srv://admin:1234@cluster0.cfglwqy.mongodb.net/?retryWrites=true&w=majority`)
    })

    test("find user",async()=>{
        const findUser = await AccountModel.findOne({username:"admin"})
        expect(findUser).toBeDefined()
        expect(findUser.username).toBe("admin")
    })

    test("find equation",async()=>{
        const equations = await MathModel.find()
        expect(equations).toBeDefined()
    })
    
    afterAll(async () => {
        await mongoose.disconnect();
      });
  
});