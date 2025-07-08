import React,{useState} from "react"
import CreateTask from './Tasks/CreateTask.js';
import TaskTable from './Tasks/TaskTable.js';
const TaskDashboard = () => {
  const [list,setList] = useState([])
  return (
    <>
      <div className="container-fluid">
            <div className="card">
                <div className="card-header">
                    <CreateTask list={list} setList={setList}/>
                </div>
                <div className="card-body">
                    <TaskTable list={list}/>
                </div>
            </div>
      </div>
    </>
  )
}

export default TaskDashboard
