const {
    Schema,
    model
} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    socketId:{
        type:String
    }
    
});

const User = model("user", userSchema)

module.exports = User