const jwt = require('jsonwebtoken')
const ApiError = require('../errors/ApiError')

module.exports = async function(req,res,next){
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return next(ApiError.unauthorized('user is not not authorized'))
        }
        const decode = jwt.verify(token, process.env.SECRET)
        req.user = decode
        next()
    }
    catch(err){
        throw err
    }
}