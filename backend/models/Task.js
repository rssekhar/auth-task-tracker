import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    taskName : {
        type : String,
        required : true
    },
    deadLine : {
        type : String,
        required:true
    }
},{
timestamps : true}
)

const Task = mongoose.model('Tasks',taskSchema)

export default Task
