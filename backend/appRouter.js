import express from "express"
import { addTask,getAllTasks,updateTask,deleteTask } from "../controllers/appController.js"
const router = express.Router()

router.post("/addTask",addTask)
router.get("/getAllTasks",getAllTasks)
router.put("/updateTask/:id",updateTask)
router.delete("/deleteTask/:id",deleteTask)

export default router