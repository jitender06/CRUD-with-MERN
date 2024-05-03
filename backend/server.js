const express = require("express")
const app = express();
const mongoose  = require("mongoose")

const dotenv = require("dotenv")
dotenv.config();

const User = require("./models/userModel")
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const userRoutes = require("./routes/userRoute")

mongoose.connect(process.env.URI).then(() => {
    console.log("connected successfully")
    app.listen(process.env.PORT || 8000, (err) => {
        if(err) console.log(err);
        console.log("running successfully")
    });
}).catch((err) => {
    console.log(err)
})

app.use(userRoutes);