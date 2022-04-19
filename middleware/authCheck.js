const jwt = require('jsonwebtoken')
const User = require('../models/UserSchema')
//TODO:  is it all necessary ...
module.exports = async function(req,res,next){

    try{
        
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            res.status(401).json({message:'user is not authorized'})
        }
        //TODO: replace secret phrase
        const decode = jwt.verify(token, 'LOLO-LOP')
        //TODO:  is it necessary ...
        req.user = decode
        //req._user = await User.findOne({name:decode.name})
        //console.log(decode)
        next()
    }
    catch(e){
        //res.status(401).json({message:'user is not authorized'}) TODO
        console.log(e)
    }
}