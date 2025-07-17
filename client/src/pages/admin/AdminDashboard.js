import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/Auth";
import { IoIosAddCircle } from "react-icons/io";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <Layout>
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-6">
            <div className="card-admin">
              <h1 className="greeting">
                Welcome Back, <span className="user-name">{auth?.user?.name}</span>!
              </h1>
              <p className="info">Email: {auth?.user?.email}</p>
              <p className="info">Contact: {auth?.user?.phone}</p>
            </div>
          </div>
          <TaskWindow tasks={tasks} addTask={addTask} deleteTask={deleteTask} />
        </div>
      </div>
    </Layout>
  );
};

const TaskWindow = ({ tasks, addTask, deleteTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      addTask(newTask);
      setNewTask("");
    }
  };

  return (
    <div className="col-md-3"> {/* Adjust the column width as needed */}
      <div class="task-window">
        <h2>My Tasks</h2>
        <div class="task-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button id="submit-button" type="submit"><IoIosAddCircle /></button>
          </form>
        </div>
        
        <ul class="task-list">
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task}</span>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
