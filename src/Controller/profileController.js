const profileModel=require('../Model/profileModel');
const jwt=require('jsonwebtoken');
const sendEmailUtility=require('../utility/sendEmailUtility');
const otpModel = require("../Model/otpModel");

//Creating a controller for creating profile
exports.createProfile=(req,res)=>{
    let bodyData=req.body;
    let query={};
    profileModel.create(bodyData)
        .then(data=>{
            res.status(200).json({status:"Successfully Created",Data:data});
        })
        .catch(error=>{
            res.status(201).json({status:"Unsuccessful",Data:error});
        })
}

//Creating a controller for logging into profile
exports.loginProfile=(req,res)=>{
    let userName=req.body['userName']
    let pass=req.body['pass'];
    profileModel.find({userName:userName,pass:pass})
        .then(data=>
        {
            if(data.length>0)
            {
                let payload={
                    exp:Math.floor(Date.now()/1000)+(60*60*60*60),
                    data:data
                }
                //var privateKey = fs.readFileSync('../src/jwtSignature/private.key');
                let token=jwt.sign(payload,"key1234",{algorithm:'HS256'});
                res.status(200).json({status:"Profile found",token:token,Data:data});

            }
            else{
                res.status(200).json({status:"unauthorized",Data:"Not found"});
            }
            })
        .catch(error=>
        {
            res.status(201).json({status:"Profile not found",Data:error});
        })
}

//Creating a controller for selecting profile
exports.selectProfile = (req, res) => {
    let userName = req.headers['userName'];
    console.log((userName));
    profileModel.find({userName:userName})
        .then(data=>{
           if(data.length>0){
               res.status(200).json({Find:"Successful",Data:data})
           }
           else{
               res.status(201).json({Find:"Unautorized",Data:"Not found"})
           }
        })
        .catch(error=>{
            res.status(400).json({Find:"Unsuccessful",Data:error})
        })
};

//Creating a controller for updating profile
exports.updateProfile = (req, res) => {
    let userName = req.headers['userName'];
    let bodyData=req.body;
    console.log((userName));
    if(bodyData!=""){
        profileModel.updateOne({userName:userName},bodyData)
            .then(data=>{
                res.status(200).json({Find:"Successfully Updated",Data:data})
            })
            .catch(error=>{
                res.status(400).json({Find:"Unsuccessful",Data:error})
            })
    }
    else{
        res.status(201).send("You must add data");
    }

};

//Creating a controller for Sending Otp
exports.sendOtp = (req, res) => {
    let email = req.params.email; // Corrected typo here (rq -> req)
    let otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Corrected OTP generation
    data = {
        email: email,
        otp: otpCode
    };
    otpModel.create(data)
        .then(data => {
            res.status(200).json({ status: "Successfully Created", Data: data });
            try {
                sendEmailUtility(email, otpCode, "OTP SENT");
            } catch (error) {
                console.error("Error sending email:", error);
            }
        })
        .catch(error => {
            res.status(201).json({ status: "Unsuccessful", Data: error });
        });
};

//Creating a controller for verifying Otp
exports.verifyOtp = async (req, res) => {
    console.log("Problem here");
    let email = req.params.email;
    let otp = req.params.otp;

    try {
        // Use await to wait for the result of otpModel.find
        let result = await otpModel.find({ email: email, otp: otp, status: 0 }).countDocuments('total');
        console.log(result);
        if(result===1)
        {
            r=await otpModel.updateOne({ email: email, otp: otp, status: 0 },{status:1});
            res.status(200).send("Successful");
        }
        else{
            res.status(200).send("Unsuccessful, OTP Expired");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

