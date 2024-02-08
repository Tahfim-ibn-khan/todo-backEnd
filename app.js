const  express=require('express');
const app=new express();
const route=require('./src/Router/api');


//Importing the packages
const  body_parser=require('body-parser');
const  expressRateLimit=require('express-rate-limit');
const  helmet=require('helmet');
const expressSanitizer=require('express-mongo-sanitize');
const  hpp=require('hpp');
const  cors=require('cors');
const mongoose=require('mongoose');

//Implementation of security
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb"}));
app.use(cors());
app.use(helmet());
app.use(expressSanitizer());
app.use(hpp({}));
const limit=expressRateLimit({windowMs:15*60*1000,max:400});
app.use(limit);

//Implementation of body_Parser
app.use(body_parser.json());
//Implementation of database
let connectionString="mongodb+srv://tahfim:tahfim@cluster0.anckfjq.mongodb.net/ToDo"
let option={user:"tahfim",pass:"tahfim",autoIndex:true};
mongoose.connect(connectionString, option)
    .then(() => {
        console.log("DataBase connected");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

//Implementation of route
app.use("/api",route);
//Undefined route
app.use("*",(req,res)=>
{
    res.status(404).json({Status: "Wrong Route", Data: "Not found"});
})

module.exports=app;



