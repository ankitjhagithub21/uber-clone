const {
    Schema,
    model
} = require("mongoose");

const captainSchema = new Schema({
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
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'color must be at least 3 characters long.']
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate must be at least 3 characters long.']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity must be at least 1.']
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto']
        },

    },
    location:{
        lat:{
            type:Number,

        },
        lng:{
            type:Number
        }
    }
    
});

const Captain = model("Captain", captainSchema)

module.exports = Captain