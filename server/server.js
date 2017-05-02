require('./config/config');
const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 

app.use(bodyParser.json());

const PORT = process.env.PORT;

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((todo) => {
        console.log('Success adding todo')
        res.status(200).send(todo);
    }, (err) => {
        console.log('Fail adding todo');
        res.status(400).send(err);
    })
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (err) => res.status(400).send(err))
})

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id))
      return  res.status(404).send({
            message: 'Not a valid ID'
        });

    console.log('valid ID');
    Todo.findById(id).then((todo) => {
        if(todo)
            {
            console.log('Todo found');
            console.log(JSON.stringify(todo, undefined, 2));
            res.send(todo);
        }
        else
            res.status(404).send({
                message: 'Todo not found'
            });
            
    }, (err) => {
            res.status(400).send(err);
    })
});


app.delete('/todos/:id', (req, res) =>{
    const id = req.params.id;

    if(!ObjectID.isValid(id))
        return res.status(404).send({message: 'Not a valid ID'});

    Todo.findByIdAndRemove(id).then((item) =>{
        if(!item) 
         return   res.status(404).send({message: 'Id wasn\'nt found'});

        res.status(200).send({message: `Deleted Item with id: ${id}`})
      
    }).catch((e) =>{
        res.status(400).send({message: 'Error happened', errorDetails: e})
    });
})

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id))
        return res.status(400).send({message : 'Invalid ID'});

    const body = _.pick(req.body, ['text', 'completed']);

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }

    else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((itemUpdated) => {
        res.send({itemUpdated: itemUpdated})
    }).catch((e) => {
        res.status(400).send({
            message: 'Error occured while updating item', 
            errorDetails: e
        })
    })
    
});

app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  let user = new User(body);

  user.save().then((newUser) => {
      user.generateAuthToken().then;
  }).catch((e) => {
      res.status(400).send({
          message: 'Error occured while creating the new user', 
          errorDetails: e
      })
  })
  
})

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`)
})

module.exports = {app};