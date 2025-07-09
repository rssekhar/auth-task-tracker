import React, { useState, useEffect } from 'react';
import axios from "axios";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './tasks.styles.css';

const TaskTable = ({ list, setList }) => {
  const [data, setData] = useState([]);
  const [task, setTask] = useState({ taskName: "", deadLine: "" });
  const [editId, setEditId] = useState(null); // Track which task you're editing

  // Fetch data on mount and when list updates
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res_api = await axios.get("https://task-tracker-backend-sius.onrender.com/tasks/getAllTasks");
        setData(res_api.data);
      } catch (error) {
        console.log('fetch error', error);
      }
    };
    fetchData();
  }, [list]);

  // 🔹 Called when you click Edit button
  const handleEditInput = (_id) => {
    const selected = data.find(item => item._id === _id);
    if (selected) {
      setTask({ taskName: selected.taskName, deadLine: selected.deadLine });
      setEditId(_id);

      // Open modal manually (Bootstrap)
      const modalElement = document.getElementById('myEditModal');
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  };

  // 🔹 Update form values
  const handleInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // 🔹 Submit updated task
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://task-tracker-backend-sius.onrender.com/tasks/updateTask/${editId}`, task);
      alert(res.data.message);

      // Update local data
      setData(prev => prev.map(item => (item._id === editId ? { ...item, ...task } : item)));

      // Close modal manually
      const modalElement = document.getElementById('myEditModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`https://task-tracker-backend-sius.onrender.com/tasks/deleteTask/${id}`);
      alert(res.data.message);
      setData(prev => prev.filter(task => task._id !== id));
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Task Name</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((taskItem, index) => (
              <tr key={taskItem._id}>
                <td>{index + 1}</td>
                <td>{taskItem.taskName}</td>
                <td>{taskItem.deadLine}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEditInput(taskItem._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(taskItem._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal (Only once, outside loop) */}
      <div className="modal fade" id="myEditModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Task</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditSubmit}>
                <div className="mb-3">
                  <label htmlFor="taskName" className="form-label">Task Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="taskName"
                    value={task.taskName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="deadLine" className="form-label">Deadline</label>
                  <input
                    type="date"
                    className="form-control"
                    name="deadLine"
                    value={task.deadLine}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskTable;
