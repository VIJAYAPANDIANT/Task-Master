// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PasswordReset from './components/Auth/PasswordReset';
import TaskList from './components/Tasks/TaskList';
import CreateTask from './components/Tasks/CreateTask';
import TaskDetail from './components/Tasks/TaskDetail';
import TaskHistory from './components/Tasks/TaskHistory';
import { auth } from './services/firebase';
import Home from './components/Tasks/home';
import GalaxyBackground from './components/GalaxyBackground';

function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;

  return user ? children : <Navigate to="/login" />;
}

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <GalaxyBackground theme={theme} />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          
          {/* Private Routes nested under Home layout */}
          <Route path="/" element={<PrivateRoute><Home theme={theme} toggleTheme={toggleTheme} /></PrivateRoute>}>
            <Route path="tasks" element={<TaskList />} />
            <Route path="create-task" element={<CreateTask />} />
            <Route path="task/:taskId" element={<TaskDetail />} />
            <Route path="history" element={<TaskHistory />} />
            <Route index element={<Navigate to="tasks" replace />} />
            <Route path="home" element={<Navigate to="/tasks" replace />} />
          </Route>
          
          {/* Default fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
