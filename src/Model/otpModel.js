const mongoose=require('mongoose');
const dataScheme=mongoose.Schema({
    email:{type:String},
    otp:{type:Number},
    status:{type:Number,default:0}
},{timestamp:true,versionKey:false});

const otpModel=mongoose.model('otps',dataScheme);
module.exports=otpModel;