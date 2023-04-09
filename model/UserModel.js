const mongoose = require('mongoose')

const UserAccountSchema = mongoose.Schema({
    username:String,
    password:String
})

const AccountModel = mongoose.model('User_Account',UserAccountSchema)
module.exports = AccountModel