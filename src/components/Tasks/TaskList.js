// TaskList.js
import React, { useState, useEffect } from 'react';
import { auth, database, ref, onValue, remove, update } from '../../services/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDueDate, setEditedDueDate] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'
  const [showCompleted, setShowCompleted] = useState(true);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      return;
    }

    const tasksRef = ref(database, 'tasks');
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const updatedTasks = [];
      snapshot.forEach((taskSnapshot) => {
        const task = taskSnapshot.val();
        if (task.userId === userId &&
            (filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'incomplete' && !task.completed))) {
          updatedTasks.push({ id: taskSnapshot.key, ...task });
        }
      });

      setTasks(updatedTasks);
    }, (error) => {
      console.error('Error fetching tasks:', error.message);
    });

    return () => unsubscribe();
  }, [userId, filter]);

  const handleDeleteTask = async (taskId) => {
    try {
      const taskRef = ref(database, `tasks/${taskId}`);
      await remove(taskRef);
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedDueDate(task.dueDate);
  };

  const handleUpdateTask = async () => {
    try {
      const taskRef = ref(database, `tasks/${editTask.id}`);
      await update(taskRef, {
        title: editedTitle,
        description: editedDescription,
        dueDate: editedDueDate,
      });
      setEditTask(null);
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  };

  const handleToggleCompletion = async (task) => {
    try {
      const taskRef = ref(database, `tasks/${task.id}`);
      await update(taskRef, { completed: !task.completed });
    } catch (error) {
      console.error('Error toggling completion status:', error.message);
    }
  };

  return (
    <>
      <Home />
      <div className="container mt-5">

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">Task List</h2>
                <div className="mt-3">
                  <label className="form-label">Filter by:</label>
                  <select
                    className="form-select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                  </select>
                </div>
                <ul className="list-group">
                  {tasks.map((task) => (
                    <li key={task.id} className="list-group-item">
                      <strong>Title:</strong>
                      {editTask && editTask.id === task.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                        />
                      ) : (
                        <span>{task.title}</span>
                      )}
                      <br />
                      <strong>Description:</strong>
                      {editTask && editTask.id === task.id ? (
                        <textarea
                          className="form-control"
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                        />
                      ) : (
                        <span>{task.description}</span>
                      )}
                      <br />
                      <strong>Due Date:</strong>
                      {editTask && editTask.id === task.id ? (
                        <input
                          type="date"
                          className="form-control"
                          value={editedDueDate}
                          onChange={(e) => setEditedDueDate(e.target.value)}
                        />
                      ) : (
                        <span>{task.dueDate}</span>
                      )}
                      <button
                        className={`btn btn-${task.completed ? 'success' : 'secondary'} btn-sm mx-2`}
                        onClick={() => handleToggleCompletion(task)}
                      >
                        {task.completed ? 'Completed' : 'Incomplete'}
                      </button>
                      {editTask && editTask.id === task.id ? (
                        <button
                          className="btn btn-primary btn-sm mx-2"
                          onClick={handleUpdateTask}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          className="btn btn-info btn-sm mx-2"
                          onClick={() => handleEditTask(task)}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="btn btn-danger btn-sm float-end"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskList;
