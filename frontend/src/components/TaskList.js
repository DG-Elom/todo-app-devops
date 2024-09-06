import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Typography } from '@mui/material';

function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task._id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task._id)}
          />
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <Typography variant="h5" component="h5" gutterBottom>{task.title}</Typography>
          </span>
          <button onClick={() => deleteTask(task._id)}><FaTrash /></button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;