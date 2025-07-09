import Task from './../models/Task.js';

export const addTask = async (req,res) =>{
    try {
        const task = new Task(req.body)
        const save_task = await task.save();
        res.status(201).json({message:'Task Added Successfully'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getAllTasks = async (req,res) =>{
    try {
        const gettask = await Task.find()
        res.status(200).json(gettask)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const updateTask = async (req,res) =>{
    try {
        const updatetask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({message:'Updated Successfully'});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const deleteTask = async (req,res) =>{
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}