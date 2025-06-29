// components/Tasks/CreateTask.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { auth, database, ref, push, set } from '../../services/firebase'; // Import database, ref, and push
import Home from './home';

import 'bootstrap/dist/css/bootstrap.min.css';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null); // Use null as the initial value for the date

  const userId = auth.currentUser?.uid;

  const handleCreateTask = async () => {
    if (title.trim() === '') return;

    try {
      // Using ref and push directly for Realtime Database
      const newTaskRef = push(ref(database, 'tasks'));

      await set(newTaskRef, {
        title,
        description,
        dueDate: dueDate ? dueDate.toISOString() : null, // Convert date to string or use null
        userId,
      });

      // Reset form fields after creating the task
      setTitle('');
      setDescription('');
      setDueDate(null);
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };

  return (
    <>
    <Home/>
    <div className="container mt-5">
    
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Create Task</h2>
              <form>
                <div className="form-group">
                  <label>Task Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Due Date:</label>
                  <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleCreateTask}
                >
                  Create Task
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CreateTask;
