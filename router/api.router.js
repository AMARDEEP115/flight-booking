const {Router} =require("express");
const { bookingModel } = require("../model/booking.model");
const { flightModel } = require("../model/flight.model");
const { userModel } = require("../model/user.model");

const apiRouter=Router();

// ------------------------------     Register and Login

apiRouter.post("/register",async(req,res)=>{
    let data = req.body;
    let sav=new userModel(data);
    await sav.save();
    res.status(201).send("Registered");
});

apiRouter.post("/login",async(req,res)=>{
    let data=req.body;
    let check=await userModel.find({email:data.email,password:data.password});
    if(check.length>0){
        res.status(201).send("Login Succesfully");
    } else {
        res.send("User Not Found");
    }
});

// -------------------------------    Flights Route

apiRouter.post("/flights",async(req,res)=>{
    let data = req.body;
    let sav=new flightModel(data);
    await sav.save();
    res.status(201).send("Booking Done");
});

apiRouter.get("/flights",async(req,res)=>{
    let data=await flightModel.find();
    res.status(200).send({"flights":data});
});

apiRouter.get("/flights/:id",async(req,res)=>{
    let Id=req.params.id;
    const data = await flightModel.findOne({ _id: Id });
    res.status(200).send(data);
});

apiRouter.patch("/flights/:id",async(req,res)=>{
    let Id=req.params.id;
    let data=req.body;
    await flightModel.findOneAndUpdate({_id:Id},data);
    res.status(204).send("flight updated");
});

apiRouter.delete("/flights/:id",async(req,res)=>{
    let Id=req.params.id;
    await flightModel.findOneAndDelete({_id:Id});
    res.status(202).send("flight deleted");
});

// ------------------------------       Booking

apiRouter.post("/booking",async(req,res)=>{
    let data = req.body;
    let Id=data.user;
    let us=await userModel.findOne({ _id: Id });
    let fId=data.flight;
    let fl=await flightModel.findOne({ _id: fId });
    let book={
        user: {name:us.name,email:us.email},
        flight: {airline:fl.airline,flightNo:fl.flightNo,price:fl.price}
    }
    let sav= new bookingModel(book);
    await sav.save();
    res.status(201).send("Booking Done");
});

// -------------------------------      Dashboard

apiRouter.get("/dashboard",async(req,res)=>{
    let data=await bookingModel.find();
    res.status(200).send({"bookings":data});
});

module.exports={apiRouter};
