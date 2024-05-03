const express = require("express");
const User = require("../models/userModel");
const mongoose = require("mongoose")
const router = express.Router();

router.post("/", async(req, res) => {
    try {
        const data = req.body;
        const userData = new User(data);
        const response = await userData.save();
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/', async (req, res) => {
    try {
        const userData = await User.find();
        res.status(200).json(userData);    
    } catch (error) {
        res.status(500).json({error: error.message});
    }
     
})

module.exports = router;