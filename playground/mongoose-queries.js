const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');

const id = '390035b78b5c1832fs861ffe6';

if(!ObjectID.isValid(id))
    return console.log('ID is not valid');

Todo.findById(id).then((todo) => {
    if(!todo){
        return console.log('not found')
    }
    console.log('find todo'); 
    console.log(todo);
})