require('dotenv').config();
const express = require("express");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConnect");
const mongoose = require("mongoose");

connectDB();

const app= express();

//This allows our application to recieve response in json format
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

const cors = require("cors");
 
app.use(cors(corsOptions));

//Route for users
app.use("/users", require("./routes/userRoutes"))
//Route for orders
app.use("/orders", require("./routes/orderRoutes.js"))


const PORT = process.env.PORT || 5000

mongoose.connection.once('open', () => {
    console.log("Succesfully Connected to Database")
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})