const express=require('express');
const router=express.Router();
const profileController=require('../Controller/profileController')
const todoListController=require('../Controller/todoListController')

const authVerificationMiddleware=require('../Middleware/authVerificationMiddleware')

router.post("/createProfile",profileController.createProfile);
router.get("/loginProfile",profileController.loginProfile);
router.post("/sendOtp/:email",profileController.sendOtp);
router.post("/verifyOtp/:email/:otp",profileController.verifyOtp);
router.get("/selectProfile",authVerificationMiddleware,profileController.selectProfile);
router.post("/updateProfile",authVerificationMiddleware,profileController.updateProfile);
router.post("/createTodo",authVerificationMiddleware,todoListController.createTodo);
router.get("/selectTodo",authVerificationMiddleware,todoListController.selectTodo);
router.post("/updateTodo",authVerificationMiddleware,todoListController.updateTodo);
router.post("/updateStatusTodo",authVerificationMiddleware,todoListController.updateStatusTodo);
router.get("/deleteTodo",authVerificationMiddleware,todoListController.deleteTodo);
router.get("/filterStatusTodo",authVerificationMiddleware,todoListController.filterStatusTodo);
router.get("/filterDateTodo",authVerificationMiddleware,todoListController.filterDateTodo);


module.exports=router;