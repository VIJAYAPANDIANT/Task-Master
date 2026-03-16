import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { auth, database, ref, onValue, push, query, orderByChild, equalTo } from '../../services/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';


const TaskDetail = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const taskRef = ref(database, `tasks/${taskId}`);
    const commentsRef = ref(database, 'comments');

    const taskUnsubscribe = onValue(taskRef, (snapshot) => {
      setTask({ id: taskId, ...snapshot.val() });
    });

    const commentsQuery = query(commentsRef, orderByChild('taskId'), equalTo(taskId));
    const commentsUnsubscribe = onValue(commentsQuery, (snapshot) => {
      const commentsData = snapshot.val();

      if (commentsData) {
        const updatedComments = Object.keys(commentsData).map((key) => ({
          id: key,
          ...commentsData[key],
        }));
        setComments(updatedComments);
      } else {
        setComments([]);
      }
    });

    return () => {
      taskUnsubscribe();
      commentsUnsubscribe();
    };
  }, [taskId]);

  const handleAddComment = async () => {
    if (comment.trim() === '') return;

    try {
      await push(ref(database, 'comments'), {
        taskId,
        userId,
        text: comment,
      });
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  return (
    <div className="container mt-5">
  
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 mb-5" style={{ backgroundColor: 'var(--card-bg)' }}>
            <div className="card-body p-5">
              {task ? (
                <div>
                  <h2 className="text-center mb-4 fw-bold" style={{ color: 'var(--text-color)' }}>Task Detail</h2>
                  <h3 style={{ color: 'var(--link-hover)' }}>{task.title}</h3>
                  <ul className="list-group list-group-flush mt-4 border rounded-3 p-2" style={{ backgroundColor: 'var(--input-bg)' }}>
                    <li className="list-group-item bg-transparent border-0" style={{ color: 'var(--text-color)' }}><b>Task ID: </b><span className="text-muted">{task.id}</span></li>
                    <li className="list-group-item bg-transparent border-0" style={{ color: 'var(--text-color)' }}><b>Description: </b> {task.description}</li>
                    <li className="list-group-item bg-transparent border-0" style={{ color: 'var(--text-color)' }}><b>Due Date: </b> {task.dueDate ? new Date(task.dueDate).toLocaleString() : 'No Due Date'}</li>
                    {task.createdAt && <li className="list-group-item bg-transparent border-0" style={{ color: 'var(--text-color)' }}><b>History (Created): </b> {new Date(task.createdAt).toLocaleString()}</li>}
                    {task.updatedAt && <li className="list-group-item bg-transparent border-0" style={{ color: 'var(--text-color)' }}><b>History (Updated): </b> {new Date(task.updatedAt).toLocaleString()}</li>}
                  </ul>
                  <div className="mt-4">
                    <h4>Comments</h4>
                    <ul className="list-group">
                      {comments.map((comment) => (
                        <li key={comment.id} className="list-group-item">
                          {comment.text}
                        </li>
                      ))}
                    </ul>
                    <div className="input-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <div className="input-group-append">
                        <button type="button" className="btn btn-primary" onClick={handleAddComment}>
                          Add Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
