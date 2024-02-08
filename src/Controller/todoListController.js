const todoListModel=require('../Model/todoListModel');
const jwt=require('jsonwebtoken');

//Creating a controller for creating todo
exports.createTodo=(req,res)=>{
    let userName=req.headers['userName'];
    let todoSubject=req.body['todoSubject'];
    let todoDesc=req.body['todoDesc'];
    let data={
        userName:userName,
        todoSubject:todoSubject,
        todoDesc:todoDesc
    };
    if(data != null && data !== "")
    {
        todoListModel.create(data)
            .then(data=>{
                res.status(200).json({status:"Successfully Created",Data:data});
            })
            .catch(error=>{
                res.status(201).json({status:"Unsuccessful",Data:error});
            })
    }
    else
    {
        res.send("Provide proper data.")
    }
}

//Creating a controller for selecting todo
exports.selectTodo=(req,res)=>{
    let userName=req.headers['userName'];
    let q='userName todoSubject todoDesc todoStatus'
        todoListModel.find({userName: userName},q)
            .then(data=>{
                res.status(200).json({status:"Data found",Data:data});
            })
            .catch(error=>{
                res.status(400).json({status:"Data not found",Data:error});
            })
}

//Creating a controller for updating todo
exports.updateTodo=(req,res)=>{
    let id=req.body['id']
    let todoSubject=req.body['todoSubject'];
    let todoDesc=req.body['todoDesc'];
    let data={
        todoSubject:todoSubject,
        todoDesc:todoDesc
    }
    todoListModel.updateOne({_id:id},data,{upsert:true})
        .then(data=>{
            res.status(200).json({status:"Updated Successfully",Data:data});
        })
        .catch(error=>{
            res.status(400).json({status:"Data not found",Data:error});
        })
}

//Creating a controller for updating todo status
exports.updateStatusTodo=(req,res)=>{
    let id=req.body['id']
    let todoStatus=req.body['todoStatus'];
    let todoUpdateDate=Date.now();
    let data={
        todoStatus:todoStatus,
        todoUpdateDate:todoUpdateDate
    }
    todoListModel.updateOne({_id:id},data,{upsert:true})
        .then(data=>{
            res.status(200).json({status:"Status Updated Successfully",Data:data});
        })
        .catch(error=>{
            res.status(400).json({status:"Data not found",Data:error});
        })
}

//Creating a controller for deleting todo
exports.deleteTodo=(req,res)=>{
    let id=req.body['id'];
    todoListModel.deleteOne({_id:id})
        .then(data=>{
            res.status(200).json({status:"Event deleted Successfully",Data:data});
        })
        .catch(error=>{
            res.status(400).json({status:"Data not found",Data:error});
        })
}

//Creating a controller for selecting todo's according to their status either[new/complete/cancel]
exports.filterStatusTodo=(req,res)=>{
    let userName=req.headers['userName'];
    let todoStatus=req.body['todoStatus']
    todoListModel.find({userName: userName,todoStatus: todoStatus})
        .then(data=>{
            res.status(200).json({status:"Data found",Data:data});
        })
        .catch(error=>{
            res.status(400).json({status:"Data not found",Data:error});
        })
}

//Creating a controller for selecting todo's according to their createDate
exports.filterDateTodo=(req,res)=>{
    let userName=req.headers['userName'];
    let toDate=req.body['toDate'];
    let fromDate=req.body['fromDate']

    todoListModel.find({userName: userName,todoCreateDate:{$gte: new Date(fromDate),$lte: new Date(toDate)}})
        .then(data=>{
            res.status(200).json({status:"Data found",Data:data});
        })
        .catch(error=>{
            res.status(400).json({status:"Data not found",Data:error});
        })
}