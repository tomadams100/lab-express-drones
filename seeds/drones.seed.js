// Iteration #1
 const drones = [
     {name: "drone1", propellers: 4, maxSpeed:50},
     {name: "drone2", propellers: 6, maxSpeed:60},
     {name: "drone3", propellers: 8, maxSpeed:70}
 ]

 // ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

const Drone = require('../models/Drone.model')
// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

const fillDatabase = async () => {
    try {
        await mongoose
        .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
          })
        console.log(`Connected to Mongo!`);
        //const deleteDrones = await Drone.deleteMany()
        Drone.create(drones)
    }
    catch (err) {
        console.error("Error connecting to mongo: ", err);
    }
    console.log("Disconnecting from the database...");
    //mongoose.disconnect(); 
}
fillDatabase()

