const  dotEnv=require("dotenv");
dotEnv.config({path:"./config.env"})
const app=require('./app');
app.listen(process.env.PORT,()=>
{
    console.log("You are connected on port "+process.env.PORT);
})