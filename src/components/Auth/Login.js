import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../../services/firebase';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      setError(null);
      setLoading(true); // Set loading state to true during login process
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful!');
      // You can navigate to another page or perform additional actions upon successful login
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Link to={"/home"}>
        <button type="button" className="btn btn-primary" onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        </Link>
        <p className="mt-3">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        <p>
          <Link to="/password-reset">Forgot your password?</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
