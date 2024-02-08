const mongoose=require('mongoose');
const dataScheme=mongoose.Schema({
    userName:{type:String},
    todoSubject:{type:String},
    todoDesc:{type:String},
    todoStatus:{type:String,default:"New"},
    todoCreateDate:{type:Date,default:Date.now()},
    todoUpdateDate:{type:Date,default:Date.now()}
},{versionKey:false});

const todoListModel=mongoose.model('todoList',dataScheme);
module.exports=todoListModel;