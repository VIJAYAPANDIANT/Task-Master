// TaskList.js
import React, { useState, useEffect } from 'react';
import { auth, database, ref, onValue, remove, update } from '../../services/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
// Removed Home import as it is handled by the layout now

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDueDate, setEditedDueDate] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'


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
        updatedAt: new Date().toISOString(),
      });
      setEditTask(null);
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  };

  const handleToggleCompletion = async (task) => {
    try {
      const taskRef = ref(database, `tasks/${task.id}`);
      await update(taskRef, { 
        completed: !task.completed,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error toggling completion status:', error.message);
    }
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-lg border-0 rounded-4" style={{ backgroundColor: 'var(--card-bg)' }}>
              <div className="card-body p-4 p-md-5">
                <h2 className="text-center mb-4 fw-bold" style={{ color: 'var(--text-color)' }}>My Tasks</h2>
                <div className="mb-4 d-flex align-items-center justify-content-between p-3 rounded-3 shadow-sm border" style={{ borderColor: 'var(--input-border)', backgroundColor: 'var(--search-bg)' }}>
                  <span className="fw-semibold" style={{ color: 'var(--muted-text)' }}>Filter by:</span>
                  <select
                    className="form-select border-0 shadow-sm w-auto"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ backgroundColor: 'var(--input-bg)', color: 'var(--input-text)' }}
                  >
                    <option value="all">All Tasks</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                  </select>
                </div>
                {tasks.length === 0 ? (
                    <div className="text-center text-muted p-5">
                        <h4>No tasks found</h4>
                        <p>Create a new task to get started!</p>
                    </div>
                ) : (
                <div className="row g-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="col-12">
                     <div className="card border-0 shadow-sm rounded-4" style={{ transition: 'all 0.3s ease', opacity: task.completed ? 0.7 : 1 }}>
                       <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                           {editTask && editTask.id === task.id ? (
                               <input
                                   type="text"
                                   className="form-control form-control-lg fw-bold mb-2 w-75"
                                   value={editedTitle}
                                   onChange={(e) => setEditedTitle(e.target.value)}
                               />
                           ) : (
                               <h5 className={`card-title fw-bold mb-0 ${task.completed ? 'text-decoration-line-through' : ''}`} style={{ color: task.completed ? 'var(--muted-text)' : 'inherit'}}>
                                  {task.title}
                               </h5>
                           )}
                           <span className="badge bg-secondary rounded-pill px-3 py-2 shadow-sm">
                                {editTask && editTask.id === task.id ? (
                                    <input type="date" className="form-control form-control-sm" value={editedDueDate} onChange={e => setEditedDueDate(e.target.value)} />
                                ) : new Date(task.dueDate).toLocaleDateString() === 'Invalid Date' ? 'No Due Date' : new Date(task.dueDate).toLocaleString(undefined, {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})}
                           </span>
                        </div>
                        
                        {editTask && editTask.id === task.id ? (
                            <textarea
                                className="form-control mb-3"
                                rows="3"
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                            />
                        ) : (
                            <p className="card-text" style={{ color: task.completed ? 'var(--muted-text)' : 'inherit' }}>{task.description}</p>
                        )}

                        <div className="mt-3 pd-2 d-flex justify-content-between align-items-center flex-wrap" style={{ fontSize: '0.85rem' }}>
                            {task.createdAt && (
                                <span className="text-muted"><i className="bi bi-clock-history me-1"></i> Created: {new Date(task.createdAt).toLocaleString(undefined, {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})}</span>
                            )}
                            {task.updatedAt && task.updatedAt !== task.createdAt && (
                                <span className="text-muted"><i className="bi bi-pencil-square me-1"></i> Updated: {new Date(task.updatedAt).toLocaleString(undefined, {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})}</span>
                            )}
                        </div>
                        
                        <hr className="my-3 opacity-25" />
                        
                        <div className="d-flex justify-content-between align-items-center mt-3">
                           <button
                             className={`btn ${task.completed ? 'btn-success' : 'btn-outline-primary'} rounded-pill px-4 fw-semibold`}
                             onClick={() => handleToggleCompletion(task)}
                           >
                             {task.completed ? <><i className="bi bi-check-circle me-1"></i> Completed</> : 'Mark Complete'}
                           </button>
                           
                           <div className="d-flex gap-2">
                              {editTask && editTask.id === task.id ? (
                                <button className="btn btn-primary rounded-pill px-3" onClick={handleUpdateTask}>Save</button>
                              ) : (
                                <button className="btn btn-light shadow-sm rounded-circle p-2" onClick={() => handleEditTask(task)} title="Edit">
                                    ✏️
                                </button>
                              )}
                              <button className="btn btn-light shadow-sm rounded-circle p-2 text-danger" onClick={() => handleDeleteTask(task.id)} title="Delete">
                                 🗑️
                              </button>
                           </div>
                        </div>

                       </div>
                     </div>
                    </div>
                  ))}
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskList;
