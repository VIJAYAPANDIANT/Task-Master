import React, { useState, useEffect } from 'react';
import { auth, database, ref, onValue } from '../../services/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskHistory = () => {
  const [tasks, setTasks] = useState([]);
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
        if (task.userId === userId) {
          updatedTasks.push({ id: taskSnapshot.key, ...task });
        }
      });
      
      // Sort tasks by updatedAt descending (newest activity first)
      updatedTasks.sort((a, b) => {
          const dateA = a.updatedAt ? new Date(a.updatedAt) : new Date(0);
          const dateB = b.updatedAt ? new Date(b.updatedAt) : new Date(0);
          return dateB - dateA;
      });

      setTasks(updatedTasks);
    }, (error) => {
      console.error('Error fetching tasks for history:', error.message);
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow-lg border-0 rounded-4" style={{ backgroundColor: 'var(--card-bg)' }}>
            <div className="card-body p-4 p-md-5">
              <h2 className="text-center mb-4 fw-bold" style={{ color: '#2c3e50' }}>Activity History</h2>
              
              {tasks.length === 0 ? (
                  <div className="text-center text-muted p-5">
                      <i className="bi bi-clock-history fs-1 mb-3 d-block"></i>
                      <h4>No history found</h4>
                      <p>Your task activity will appear here.</p>
                  </div>
              ) : (
                  <div className="timeline">
                    {tasks.map((task) => (
                      <div key={task.id} className="card border-0 shadow-sm rounded-4 mb-3">
                         <div className="card-body p-3">
                             <div className="d-flex justify-content-between align-items-center">
                                 <h6 className="fw-bold mb-0" style={{ color: 'var(--link-hover)' }}>{task.title}</h6>
                                 <span className="badge border" style={{ color: 'var(--text-color)', backgroundColor: 'var(--input-bg)' }}>
                                    ID: {task.id.substring(0, 8)}...
                                 </span>
                             </div>
                             
                             <div className="mt-3 text-muted" style={{ fontSize: '0.9rem' }}>
                                 {task.createdAt && (
                                     <div className="mb-1">
                                         <i className="bi bi-plus-circle text-success me-2"></i>
                                         Created on: <span className="fw-medium">{new Date(task.createdAt).toLocaleString(undefined, {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})}</span>
                                     </div>
                                 )}
                                 {task.updatedAt && task.updatedAt !== task.createdAt && (
                                     <div>
                                         <i className="bi bi-pencil-square text-warning me-2"></i>
                                         Last Updated: <span className="fw-medium">{new Date(task.updatedAt).toLocaleString(undefined, {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})}</span>
                                         {task.completed && <span className="badge bg-success ms-2">Completed</span>}
                                     </div>
                                 )}
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
  );
};

export default TaskHistory;
