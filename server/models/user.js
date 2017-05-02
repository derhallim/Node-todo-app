const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
    email : {
        type: String, 
        required: true, 
        trim: true, 
        unique: true, 
        validate: {
            validator: validator.isEmail, 
            message: '{VALUE} is not a correct email', 
            isAsync: false
        }
    }, 
    password : {
        type: String, 
        required: true, 
        minglength: 6
    }, 
    tokens: [{
        access: {
            type: String, 
            required: true
        }, 
        token: {
            type: String, 
            required: true
        }
    }]
});

schema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, '123abc').toString();

    user.tokens.push(token);

    return user.save().then(() =>{
        return token; 
    })
}


const User = mongoose.model('User', schema);

module.exports = {User};