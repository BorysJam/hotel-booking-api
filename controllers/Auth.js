const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const user = require("../models/user");
const createError = require('../utils/error');

const register = async(req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new user({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        await newUser.save()
        res.status(200).json("user has been created")
    }catch(err){
        next(err)
    }
}
const login = async(req,res,next)=>{
    try{
        const loginUser = await user.findOne({ username: req.body.username });

        if(!loginUser) return next(createError(404, 'user not found'));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password, 
            loginUser.password
            )
      

        if(!isPasswordCorrect) return next(createError(400, 'password is wrong'))
        
        const { password, isAdmin, ...otherDetails } = loginUser._doc;

        res.status(200).json({...otherDetails})
        
    }catch(err){
        next(err)
    }
}
module.exports = { register, login }