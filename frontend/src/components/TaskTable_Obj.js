import React, { useState, useEffect } from 'react';
import axios from "axios"

const TaskTable = ({ list }) => {
  const [data, setData] = useState(list);

  useEffect(() => {
    const fetchData = async ()=>{
        try {
        const res_api = await axios.get("http://localhost:5000/tasks/getAllTasks")
        console.log(res_api)
        setData(res_api.data); // Update local state when props change
      } catch (error) {
        console.log('fetch error',error)
      }
    }
    fetchData()
  }, [list]);

  const handleEdit = (id) => {
    console.log("Edit ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete ID:", id);
  };

  if (data.length !== 0) {
    const headers = Object.keys(data[0]); // use data instead of list

    return (
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              {headers.map((key, index) => (
                <th key={index}>{key.toUpperCase()}</th>
              ))}
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((key, colIndex) => (
                  <td key={colIndex}>{row[key]}</td>
                ))}
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(row.id)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <div><p>No Data Available Please Add New Task...</p></div>;
};

export default TaskTable;
