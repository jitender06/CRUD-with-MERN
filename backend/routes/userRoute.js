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

router.get("/:id", async(req, res) => {
    try {
        const id = req.params.id
        const singledata = await User.findById({_id: id})
        res.status(200).json(singledata);   
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const deleteUser = await User.findByIdAndDelete({_id: id})
        res.status(200).json({message:"deleted successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.put("/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const response = await User.findByIdAndUpdate(id, data, {
            new : true, //return the updated document
            runValidators: true // run mongoose validator
        } )
        if(!response){
            res.status(404).json({error: "user not found"})
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error:"internal server error"});
    }
})

module.exports = router;