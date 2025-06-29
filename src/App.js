// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PasswordReset from './components/Auth/PasswordReset';
import TaskList from './components/Tasks/TaskList';
import CreateTask from './components/Tasks/CreateTask';
import TaskDetail from './components/Tasks/TaskDetail';
import { auth } from './services/firebase';
import Home from './components/Tasks/home';


function PrivateRoute({ path, element }) {
  return auth.currentUser ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" />
  );
}

const App = () => {
  return (
  
    <Router>
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <PrivateRoute path="/tasks" element={<TaskList />} />
        <PrivateRoute path="/create-task" element={<CreateTask />} />
        <PrivateRoute path="/task/:taskId" element={<TaskDetail />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
