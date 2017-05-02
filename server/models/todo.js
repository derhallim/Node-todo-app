const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        minlength: 3,
        trim: true,
        required: true
    },
    completedAt: {
        type: Number,
        default: null
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = {Todo};