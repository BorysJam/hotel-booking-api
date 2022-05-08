const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const authRoute = require('./routes/auth');
const hotelsRoute = require('./routes/hotels');
const roomsRoute = require('./routes/rooms');
const usersRoute = require('./routes/users');

app.use(express.json())


mongoose.connect(`mongodb+srv://bookingadmin:${process.env.MONGO_URI}@cluster0.cf9f7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(()=>{
    console.log('Connected to database')
    }).catch(err =>{
        console.log(err)
})

mongoose.connection.on('disconnect', ()=>{
    console.log('mongodb disconnected')
})

mongoose.connection.on('connected', ()=>{
    console.log('mongodb is connected')
})

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)

app.use((err,req,res,next)=>{
    const errStats = err.status || 500;
    const errMessage = err.message || "Something went wrong" 
    return res.status(errStats).json({
        success:false,
        status:err,
        message:errMessage,
        stack:err.stack,
    })
})

app.listen(3000, ()=>{
    console.log('connected to port 3000')
})