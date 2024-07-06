const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { validationResult, body } = require('express-validator');
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
const JWT_SECRET = "SignedBy%Dr@Legend%"
const fetchuser = require('../middleware/userinfo')

//Creating a new user using the /api/auth/createuser endpoint

router.post('/createuser', [
    body('username').isLength({ min: 5 }),
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8 })
],
    async (req, res) => {
        //Checking if the parameters satisfy the minimum required conditions
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        else {
            let success = false
            //Check whether the user has unique username and email by checking in the database
            try {
                if (await User.findOne({ username: req.body.username })) {
                    return res.status(400).json({ success, errors: "Sorry the user with this username already exists" })
                }
                else if (await User.findOne({ email: req.body.email })) {
                    return res.status(400).json({ success, errors: "Sorry the user with this email already exists" })
                }
                else {
                    success = true
                    //Securing the data
                    const salt = await bcrypt.genSalt(10)
                    const securedPassword = await bcrypt.hash(req.body.password, salt)

                    //Saving the data to the database
                    let user = await User.create({
                        name: req.body.name,
                        username: req.body.username,
                        email: req.body.email,
                        password: securedPassword,
                    })

                    //data stores the payload or the static info of the user that has just been authenticated to enter
                    const data = {
                        id: user.id
                    }
                    //generating a token to be used to access different sections of the website
                    const authToken = jwt.sign(data, JWT_SECRET)
                    res.json({ success, authToken })
                }
            }
            catch (error) {
                console.error(error.message)
                res.status(500).send("Some internal server error occured")
            }
        }
    })

//Logging a user to the website using the /api/auth/login endpoint

router.post('/login', [
    body('loginId', "Please enter a login id").exists(),
    body('password', "Password cannot be blank").exists()
],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() })
        }
        else {
            //Checking if the user exists on our database
            const { loginId, password } = req.body
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            //If the user has entered the email id
            let query = {}
            if (validRegex.test(loginId)) {
                query = { email: loginId }
            }
            //The user has entered his user name
            else {
                query = { username: loginId }
            }
            authenticate(password, res, query)
        }
    })


//Common function to authenticate the user using the username/email and password
async function authenticate(password, res, query) {
    try {
        let success = false
        let user = await User.findOne(query)
        if (!user) {
            return res.status(400).json({ success, errors: `Invalid username/email` })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ success, errors: "Invalid password entered" })
        }
        //data stores the payload or the static info of the user that has just been authenticated to enter
        const data = {
            id: user.id
        }
        //generating a token to be used to access different sections of the website
        success = true;
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({ success, authToken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some internal server error occured")
    }
}


// Getting user info using the token created /api/auth/getuser

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        //Receiving the user a logged in user using fetchuser middleware
        const userId = req.user
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some internal server error occured")
    }
})



module.exports = router

