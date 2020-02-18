const router = require('express').Router()
const verify = require('./verifyToken')


// Private route
router.get('/', verify, (req, res) => {    
    res.json({
        posts: {
            title: "Title 1",
            description: "They who can give up essential liberty to obtain " +
                "a little temporary safety deserve neither liberty nor safety."
        }})
})

// Public route
router.get('/all', (req, res) => {
    res.json({
        posts:{
            title: "Title 2",
            description: "Hello World application is the first and yet the most important door in learning new technology"
        }
    })
})

module.exports = router