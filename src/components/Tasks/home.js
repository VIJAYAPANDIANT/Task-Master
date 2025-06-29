// Home.js
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { auth } from '../../services/firebase';
import Welcome from './Welcome';
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';

const Home = () => {
  const [searchedTaskId, setSearchedTaskId] = useState('');

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('Logged out successfully.');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const handleSearchTask = () => {
    // Redirect to the searched task immediately
    window.location.href = `/task/${searchedTaskId}`;
  };

  return (
    <div className='' style={{ paddingLeft: '15px', paddingRight: '15px' }}>
      {/* Bootstrap Navbar using react-bootstrap components */}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/home" style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Task Manager 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse className="justify-content-end" id="navbarNav">
          <Nav>
            <Link className="nav-link" to="/create-task" style={{ fontSize: '18px', fontWeight: 'bold' }}>
              Create Task
            </Link>
            <Link className="nav-link" to="/tasks" style={{ fontSize: '18px', fontWeight: 'bold' }}>
              Show Tasks
            </Link>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search Task ID"
                className="mr-sm-2"
                value={searchedTaskId}
                onChange={(e) => setSearchedTaskId(e.target.value)}
              />
              <Button
                variant="outline-primary"
                onClick={handleSearchTask}
                style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px' }}
              >
                Search
              </Button>
            </Form>
            <Link to="/login">
              <Button
                variant="outline-danger"
                onClick={handleLogout}
                style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px' }}
              >
                Logout
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Content based on selected button */}
      <div className="container mt-3 d-flex flex-column align-items-center justify-content-center">
        <Welcome />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
