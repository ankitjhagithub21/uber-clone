const {
    Schema,
    model
} = require("mongoose");

const rideSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    captain: {
        type: Schema.Types.ObjectId,
        ref:"User",
        
    },

    pickup: {
        type: String,
        required:true,
        
    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
   
    status:{
        type:String,
        enum:['pending','accepted','ongoing','completed','cancelled'],
        default:'pending'
    },

    duration:{
        type:Number,
       
    },
    distance:{
        type:Number,
       
    },
    paymentId:{
        type:String,
    },
    orderId:{
        type:String
    },
    signature:{
        type:String
    },
    otp:{
        type:String,
        select:false,
        required:true
    }
});

const Ride = model("Ride", rideSchema)

module.exports = Ride