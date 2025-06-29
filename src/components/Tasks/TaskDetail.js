import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { auth, database, ref, onValue, push, query, orderByChild, equalTo } from '../../services/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home';


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
    <>
    <Home/>
    <div className="container mt-5">
  
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {task ? (
                <div>
                  <h2 className="text-center mb-4 ">Task Detail</h2>
                  <h3>{task.title}</h3>
                  <ul className="list-group mt-3">
                    <li className="list-group-item "><b>Task ID: </b>{task.id}</li>
                    <li className="list-group-item"><b>Description: </b> {task.description}</li>
                    <li className="list-group-item"><b>Due Date: </b> {task.dueDate}</li>
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
    </>
  );
};

export default TaskDetail;
