//number of bits for the resulting hash
// const {SHA256} = require('crypto-js');

// var message = 'I am user number 3';

// var hash = SHA256(message).toString();

// console.log(message);
// console.log(hash);



const jwt = require('jsonwebtoken');
var data = {
    id: 10
}

var token = jwt.sign(data, '123abc');
console.log(token);


var decoded = jwt.verify(token, '123abc'); 

console.log(decoded);