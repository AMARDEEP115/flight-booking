const mongoose=require("mongoose");

// mongodb://127.0.0.1:27017/flight-booking?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1

const connection=mongoose.connect("mongodb+srv://AmarDeep:Amar@cluster0.em0sdkc.mongodb.net/?retryWrites=true&w=majority");

module.exports={connection};