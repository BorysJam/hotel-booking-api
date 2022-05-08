const hotel = require('../models/hotel.js')

const createHotel = async(req,res, next)=>{
    const newHotel = new hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err){
        next(err)
    }
}
const updateHotel = async(req,res, next)=>{
    try{
        const updatedHotel = await hotel.findByIdAndUpdate(req.params.id, { $set: req.body},{new: true})
        res.status(200).json(updatedHotel)
    }catch(err){    
        next(err)
    }
}
const deleteHotel = async(req,res, next)=>{
    try{
        const deleteHotel = await hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("hotel has been deleted")
    }catch(err){
        next(err)
    }
}
const getHotel = async(req,res, next)=>{
    try{
        const getHotel = await hotel.findById(req.params.id)
        res.status(200).json(getHotel)
    }catch(err){
        next(err)
    }
}
const getAllHotels = async(req,res, next)=>{
    try{
        const getAllHotels = await hotel.find()
        res.status(200).json(getAllHotels)
    }catch(err){
        next(err)
    }
}


module.exports ={createHotel, updateHotel, deleteHotel, getHotel, getAllHotels}