const user = require("../models/user")

const register = async(req,res,next)=>{
    try{
        const newUser = new user({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        await newUser.save()
        res.status(200).json("user has been created")
    }catch(err){
        next(err)
    }
}
module.exports = register