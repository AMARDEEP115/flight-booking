const express=require("express");
const {connection}=require("./config/db");
const { apiRouter } = require("./router/api.router");
const cors = require('cors');

const app=express();

app.use(express.json());

app.use(cors({"origin": "*"}));

app.get("/",(req,res)=>{
    res.send({"message":"This is home page","To register or login":"/api/register or /api/login","to add or find or update a flight":"/flights or /flights/:id","to book a flight":"/api/booking","to get list of all booked flights":"/api/dashboard"});
});

app.use("/api",apiRouter);

app.listen(8080,async()=>{
    try{
        await connection;
        console.log("Connected to db");
    } catch(err) {
        console.log(err);
        console.log("Not Connected to db");
    }
    console.log("server is running at port 8080");
});