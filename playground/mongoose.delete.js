const {Todo} = require('./../server/models/todo');

const {mongoose} = require('./../server/db/mongoose.js');


//method 1
Todo.remove({}).then((res) => {
            console.log(res);
        }).catch((e) => {
            console.log(e);
}); 

//method 2
// Todo.findOneAndRemove({
//             "_id": "5907579d41b3dc4812eca79c"
//         }).then((res) =>{
//             console.log(res);
//         }).catch((e) => {
//             console.log(e);
// });;

//method 3
// Todo.findByIdAndRemove('5907583d41b3dc4812eca7da').then((res) => {
//     console.log(res);
// }).catch((e) => {
//     console.log(e);
// });