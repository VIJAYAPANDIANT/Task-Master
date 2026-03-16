// Home.js
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { auth } from '../../services/firebase';
import Welcome from './Welcome';
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';

const Home = ({ theme, toggleTheme }) => {
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
    window.location.href = `/task/${searchedTaskId}`;
  };

  return (
    <>
      <Navbar expand="lg" className="navbar py-3 px-4 position-sticky top-0 z-3">
        <div className="container-fluid">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
            <span style={{ fontSize: '28px' }}>✨</span>
            <span className="navbar-brand mb-0 h1">Task Master</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto gap-3">
              <Link className="nav-link fw-semibold" to="/tasks">
                <i className="bi bi-list-task me-1"></i> Dashboard
              </Link>
              <Link className="nav-link fw-semibold" to="/create-task">
                <i className="bi bi-plus-circle me-1"></i> New Task
              </Link>
              <Link className="nav-link fw-semibold" to="/history">
                <i className="bi bi-clock-history me-1"></i> History
              </Link>
            </Nav>
            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
              <Form className="d-flex position-relative">
                <FormControl
                  type="search"
                  placeholder="Find ID..."
                  className="form-control rounded-pill pe-5"
                  aria-label="Search"
                  value={searchedTaskId}
                  onChange={(e) => setSearchedTaskId(e.target.value)}
                  style={{ width: '200px', backgroundColor: 'var(--search-bg)' }}
                />
                <Button 
                   variant="link" 
                   onClick={handleSearchTask}
                   className="position-absolute end-0 top-50 translate-middle-y text-muted text-decoration-none shadow-none"
                >
                  🔍
                </Button>
              </Form>
              
              <Button 
                variant="outline-secondary" 
                className="rounded-circle rounded-pill p-2 shadow-sm d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px', border: '1px solid var(--input-border)' }}
                onClick={toggleTheme}
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </Button>

              <Button
                variant="outline-danger"
                className="rounded-pill px-4 fw-semibold shadow-sm"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>

      {/* Main Content Area */}
      <main className="container-fluid py-4" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Welcome />
        <div className="mt-4">
           <Outlet />
        </div>
      </main>
    </>
  );
};

export default Home;
