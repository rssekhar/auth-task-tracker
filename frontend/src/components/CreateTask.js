import React,{useState} from 'react'
import axios from "axios";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'; // important for modal to work
const CreateTask = ({list,setList}) => {
  const [task,setTask] = useState({
    taskName : "",
    deadLine : ""
  })

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const newTask = {
      id : list.length + 1,
      taskName : task.taskName,
      deadLine : task.deadLine
    }
    
    setList([...list,newTask])
    // console.log(list)
    try {
      const res = await axios.post("https://task-tracker-backend-sius.onrender.com/tasks/addTask",task)
      const data = await res.data;
      if(data)
      {
        alert(data.message);
      }
    } catch (error) {
      console.log('add error',error)
    }

    // Close the modal manually
    const modal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
    modal.hide();
    
    setTask({
      taskName : "",
      deadLine : ""
    })

  }  
  const handleInput = (e)=>{
    setTask({...task,[e.target.name]:e.target.value})
  }

  return (
    <>
      
      <div>
        <div className="d-flex justify-content-between align-items-center">
            <h5>Task Tracker</h5>
                    
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
          New Task
          </button>
        </div>
        {
          
            <div className="modal" id="myModal">
              <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">Add Task</h4>
                      <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="taskName" className="form-label">Task Name</label>
                      <input type="text" className="form-control" id="taskName" required name="taskName" onChange={handleInput} value={task.taskName}/>
                      
                    </div>
                    <div className="mb-3">
                      <label htmlFor="deadline" className="form-label">Deadline</label>
                      <input type="date" className="form-control" id="deadline" required name="deadLine" onChange={handleInput} value={task.deadLine}/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                  </div>
                  </div>
              </div>
              </div>
        }
        
        
      </div>

    </>
  )
}

export default CreateTask
