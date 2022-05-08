const express = require('express');
const hotel = require('../models/hotel');
const createError = require('../utils/error');

const router = express.Router()

//post room
router.post('/:id?', async(req,res)=>{

    const newHotel = new hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err){
        res.status(500).json(err)
    }
})

//update
router.put('/:id', async(req,res)=>{
    try{
        const updatedHotel = await hotel.findByIdAndUpdate(req.params.id, { $set: req.body},{new: true})
        res.status(200).json(updatedHotel)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete
router.delete('/:id', async(req,res)=>{
    try{
        const deleteHotel = await hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("hotel has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

//get hotel
router.get('/:id', async(req,res)=>{
    try{
        const getHotel = await hotel.findById(req.params.id)
        res.status(200).json(getHotel)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get('/', async(req,res, next)=>{
    const failed = true
    if(failed) return next(createError(401, 'Your not authenticated'))
    try{
        const getAllHotels = await hotel.find()
        res.status(200).json(getAllHotels)
    }catch(err){
        next(err)
    }
})

module.exports = router