const { createPromptModule } = require('inquirer');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        unique: true,
        trimmed: true
    },
    email: { 
        type: String, 
        required: true
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        }
    ],
    friends: [
        {
            type: Schema.types.ObjectId,
            ref: 'user',
        }
    ]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
});

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
