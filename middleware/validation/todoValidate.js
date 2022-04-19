const { Joi } = require("express-validation");

 
const todoValidation = {
    body: Joi.object({
        comments:Joi.string().max(20).empty(''),
        content: Joi.string().min(5).max(100)
    })
};


module.exports =  todoValidation
