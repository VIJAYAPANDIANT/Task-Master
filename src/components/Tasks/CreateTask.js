// components/Tasks/CreateTask.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { auth, database, ref, push, set } from '../../services/firebase'; // Import database, ref, and push
// Removed Home import

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

      const now = new Date().toISOString();
      await set(newTaskRef, {
        title,
        description,
        dueDate: dueDate ? dueDate.toISOString() : null, // Convert date to string or use null
        userId,
        createdAt: now,
        updatedAt: now,
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
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4" style={{ backgroundColor: 'var(--card-bg)' }}>
            <div className="card-body p-4 p-md-5">
              <h2 className="text-center mb-4 fw-bold" style={{ color: 'var(--text-color)' }}>Create a New Task</h2>
              <form>
                <div className="mb-4">
                  <label className="form-label fw-semibold text-muted mb-2">Task Title</label>
                  <input
                    type="text"
                    className="form-control form-control-lg border-0 shadow-sm"
                    style={{ backgroundColor: 'var(--input-bg)', color: 'var(--input-text)' }}
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold text-muted mb-2">Description</label>
                  <textarea
                    className="form-control form-control-lg border-0 shadow-sm"
                    style={{ backgroundColor: 'var(--input-bg)', color: 'var(--input-text)' }}
                    placeholder="Add more details about this task"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-5 d-flex flex-column" style={{ position: 'relative' }}>
                  <label className="form-label fw-semibold text-muted mb-2">Due Date</label>
                  <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    className="form-control form-control-lg border-0 shadow-sm w-100"
                    placeholderText="Select date and time"
                    popperPlacement="bottom-start"
                  />
                </div>
                <div className="d-grid mt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg rounded-pill fw-bold shadow-sm py-3"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}
                    onClick={handleCreateTask}
                  >
                    🚀 Create Task
                  </button>
                </div>
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
