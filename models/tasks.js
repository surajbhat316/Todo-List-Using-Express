const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({

    isCompleted : {
        type: Boolean,
        required: true,
        default: false
    },
    task_name : {
        type: String,
        required : true
    },
    category : {
        type: String,
        required : true
    },
    due_date: {
        type: Date,
        required: true
    }

})

const Tasks = new mongoose.model('Tasks', tasksSchema);
module.exports = Tasks;