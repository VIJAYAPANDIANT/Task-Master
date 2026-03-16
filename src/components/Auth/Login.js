import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../../services/firebase';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError(null);
      setLoading(true); 
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful!');
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg border-0 rounded-4" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="card-body p-4 p-md-5">
          <h2 className="text-center mb-4 fw-bold" style={{ color: 'var(--text-color)' }}>Welcome Back</h2>
          {error && <div className="alert alert-danger rounded-3">{error}</div>}
          <form>
            <div className="mb-4">
              <label className="form-label fw-semibold text-muted mb-2">Email address</label>
              <input 
                type="email" 
                className="form-control form-control-lg border-0 shadow-sm" 
                style={{ backgroundColor: 'var(--input-bg)', color: 'var(--input-text)' }}
                placeholder="name@example.com"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold text-muted mb-2">Password</label>
              <input 
                type="password" 
                className="form-control form-control-lg border-0 shadow-sm" 
                style={{ backgroundColor: 'var(--input-bg)', color: 'var(--input-text)' }}
                placeholder="••••••••"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className="d-grid mt-4">
              <button 
                type="button" 
                className="btn btn-primary btn-lg rounded-pill fw-bold shadow-sm py-3" 
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}
                onClick={handleLogin} 
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Sign In'}
              </button>
            </div>
            <div className="text-center mt-4 text-muted">
              <p className="mb-2">
                Don't have an account? <Link to="/register" className="text-decoration-none fw-semibold">Register here</Link>
              </p>
              <p className="mb-0">
                <Link to="/password-reset" className="text-decoration-none text-secondary">Forgot your password?</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
