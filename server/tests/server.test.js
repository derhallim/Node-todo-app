const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server');
const {Todo}  = require('./../models/todo');
const {ObjectID}  = require('mongodb');

const todosData = [{ _id:  new ObjectID(), text: 'Something to do 1' }, {_id:  new ObjectID(), text: 'Play football' }, { _id:  new ObjectID(), text: 'Do anything' }];

beforeEach((done) => {
    Todo.remove({}).then(() => {
       return  Todo.insertMany(todosData)
    }).then(() => done()).catch((e) => done(e));
  
})

describe('POST /todos Success', () => {
    it('Should add a new todo', (done) => {
        let text = 'something cool';
        request(app) 
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, result) => {
                if(err){
                    return done(err) 
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1); 
                    expect(todos[0].text).toBe(text)
                    done();
                }).catch((e) => {
                    console.log('error occured in DB');
                    done(e)
                });
            })
    });
});


describe('POST /todos Fail', () => {
    it('Should Fail On Empty Text', (done) => {
        request(app)
            .post('/todos')
            .send({
                text: ''
            })
            .expect(400)
            .end((err, {}) => {
                if(err){
                    return done(err)
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    done();
                }).catch((e) => done(e));
            })
    })
})

describe('GET /todos Success', () => {
    it('Should get 1 todo', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(3)
            })
            .end((err, {}) => {
                if(err)
                    return done(err)

                done();
            })
    })
})


describe('GET /todos/:id', ()=> {
    it('Should return a todo item', (done) => {
        var hexId = todosData[0]._id.toHexString();
       
        request(app)
            .get(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                console.log('res ', res.body);
                expect(res.body.text).toBe(todosData[0].text)
            })
            .end(done);
    }) 


    it('Should return 404', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    })

    it('Should return 404 for non valid IDs', (done) => {
        request(app)
            .get('/todos/123234234')
            .expect(404)
            .end(done)
    })
})