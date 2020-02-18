const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

//Import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

dotenv.config()


// Connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true},  () => {
    console.log("Connected to db")
})

// Middlewares
app.use(express.json())

// Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)


app.get('/', (req, res) => {
    res.send("Hello World!\nThis is your friend `Mahmoud Abdallah`")
})


app.listen(3001, () => {
    console.log("Server is up and running")
})