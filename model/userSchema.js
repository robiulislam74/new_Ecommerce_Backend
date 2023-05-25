const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchemaModel = new Schema({
    fullName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    avater:{
        type: String
    },
    verification:{
        type: Boolean,
        default: false
    },
    mechant:{
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        default: "membar",
        enum:["admin","merchant","membar"]
    },
    randomNumberOTP:{
        type: String,
    },
    facebookId:{
        type: String,
    },
    linkedinId:{
        type: String,
    },
    updated:{
        type: Date,
    },
    created:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User",userSchemaModel)