const {Schema , model } = require('mongoose')

const User = new Schema({
    name:{
        required: true,
        type:String
    },
    password:{
        required:true,
        type: String
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        required:true,
        unique:true,
        type: String
    },
    todos:{
        items:[
            {
                todoId:{
                    required: true,
                    type: Schema.Types.ObjectId,
                    ref: 'TODO'
                }
            }
        ]
    }
})
User.methods.addTodo = function(todo){
    items.push(todo)
}
module.exports = model('User' , User)