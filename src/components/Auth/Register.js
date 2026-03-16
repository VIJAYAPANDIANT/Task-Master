import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from '../../services/firebase';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
        setError('Please enter both email and password.');
        return;
    }
    try {
      setError(null);
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registration successful, please login');
      navigate('/login');
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg border-0 rounded-4" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="card-body p-4 p-md-5">
          <h2 className="text-center mb-4 fw-bold" style={{ color: 'var(--text-color)' }}>Create Account</h2>
          {error && <div className="alert alert-danger rounded-3">{error}</div>}
          <form>
            <div className="mb-4">
              <label className="form-label fw-semibold mb-2" style={{ color: 'var(--text-color-secondary)' }}>Email address</label>
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
              <label className="form-label fw-semibold mb-2" style={{ color: 'var(--text-color-secondary)' }}>Password</label>
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
                style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', border: 'none' }}
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </div>
            <div className="text-center mt-4 text-muted">
              <p className="mb-0">
                Already have an account? <Link to="/login" className="text-decoration-none fw-semibold">Login here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
