var jwt = require("jsonwebtoken")
const JWT_SECRET = "SignedBy%Dr@Legend%"

const fetchuser = (req, res, next) => {
    //Get the user id from the user token
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "The token has not been sent to the header" })
    }
    try {
        //The payload of the jwt ie the user id is retured along with and iat when using jwt.verify
        const data = jwt.verify(token, JWT_SECRET)
        //Storing the user id of a user to req.user
        req.user = data.id
        next()
    } catch (error) {
        res.status(401).send({ error: "The token recieved doen not belong to any of the user present in the database" })

    }
}
module.exports = fetchuser





