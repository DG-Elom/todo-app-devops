import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './styles/App.css';
import { Container, Typography } from '@mui/material';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3000/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async (title) => {
    const response = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t._id === id);
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    });
    const updatedTask = await response.json();
    setTasks(tasks.map(t => t._id === id ? updatedTask : t));
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <Container maxWidth="sm">
      <div className="App">
      <Typography variant="h2" component="h1" gutterBottom>
        Todo List
      </Typography>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>
    </Container>
  );
}

export default App;