const express = require('express');

const router = express.Router()

router.get('/', (req,res)=>{
    res.send('Hello this is auth')
})
router.get('/register', (req,res)=>{
    res.send('Hello this is register')
})

module.exports = router