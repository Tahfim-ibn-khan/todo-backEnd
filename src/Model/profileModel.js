const mongoose=require('mongoose');
const toDoScheme=mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,
        validate:
            {
                validator:(value)=>
                {
                    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
                },
                message:"Provide a proper email. Eg.name@email.com"
            }},
    mobile:{type:String,required:true,
    validate:
        {
            validator:(value)=>
            {
                return /^(?:\+88|88)?(01[3-9]\d{8})$/.test(value);
            },
            message:"Provide a proper mobile no. Eg.+8801700000000"
        }},
    city:{type:String,required:true},
    userName:{type:String,required:true,unique:true},
    pass:{type:String,required:true},
},{versionKey:false});

const profileModel=mongoose.model('profile',toDoScheme);
module.exports=profileModel;