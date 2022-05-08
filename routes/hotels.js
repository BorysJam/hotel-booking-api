const express = require('express');
const hotelController = require('../controllers/hotel');
const hotel = require('../models/hotel');
const createError = require('../utils/error');

const router = express.Router()

//post room
router.post('/', hotelController.createHotel)

//update
router.put('/:id', hotelController.updateHotel)

//delete
router.delete('/:id', hotelController.deleteHotel)

//get hotel
router.get('/:id', hotelController.getHotel)

//get all hotels
router.get('/', hotelController.getAllHotels)

module.exports = router