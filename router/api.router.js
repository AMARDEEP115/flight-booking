const {Router} =require("express");
const { bookingModel } = require("../model/booking.model");
const { flightModel } = require("../model/flight.model");
const { userModel } = require("../model/user.model");

const apiRouter=Router();

apiRouter.get("/dashboard",async(req,res)=>{
    let data=await bookingModel.find();
    res.status(200).send({"bookings":data});
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
})

apiRouter.post("/booking",async(req,res)=>{
    let data = req.body;
    let sav= new bookingModel(data);
    await sav.save();
    res.status(201).send("Booking Done");
});

apiRouter.post("/flights",async(req,res)=>{
    let data = req.body;
    let sav=new flightModel(data);
    await sav.save();
    res.status(201).send("Booking Done");
});

apiRouter.patch("/flights/:id",async(req,res)=>{
    let Id=req.params.id;
    let data=req.body;
    await flightModel.findOneAndUpdate({_id:Id},data);
    res.status(204).send("flight updated");
});

apiRouter.delete("/flights/:id",async(req,res)=>{
    let Id=req.params.id;
    let data=req.body;
    await flightModel.findOneAndDelete({_id:Id});
    res.status(202).send("flight deleted");
});

module.exports={apiRouter};
