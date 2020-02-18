const router = require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {registerValidation, loginValidation} = require('../validation')



router.post('/register', async (req, res) => {

    // Validate data before insert
    const {error} = registerValidation(req.body)
    if (error)
        return res.status(404).send(error.details[0].message)

    // Checking if the user already exist in the database
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists)
        return res.status(400).send("Email already exists")


    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    

    // Create a user 
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    
    // Try to save new user
    try{
        const saveUser = await user.save()
        res.send({user: user._id})
    }catch(err){
        res.status(404).send(err)
    }
})


router.post('/login', async (req, res) => {
    // Validate the data before insert.Validat
    
    const {error} = loginValidation(req.body)
    if (error)
        return res.status(404).send(error.details[0].message)
    
    // Checking if the user exists
    const user = await User.findOne({email: req.body.email})
    if(!user)
        return res.status(400).send("Email is wrong")

    // Check the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass)
        return res.status(400).send("password is wrong")

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
    //res.send("Logged in")
})

module.exports = router