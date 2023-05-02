require('dotenv').config()

//we are able to use json web token by requiring it and
// assigning it to a variable
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        // get the token from the body that was sent from the front end
        const headerToken = req.get('Authorization')

        // if there is no token, send back message
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            // checks to see if the token is valid
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        // if the token is not valid, send back message
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}