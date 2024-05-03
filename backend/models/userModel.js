const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
},{timestamps: true})



const User = mongoose.model("user", userSchema);

module.exports = User;