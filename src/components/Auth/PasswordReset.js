// PasswordReset.js
import React, { useState } from 'react';
import { auth,sendPasswordResetEmail } from '../../services/firebase';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleReset = async () => {
    try {
      // Call sendPasswordResetEmail from the imported service
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Reset Password</h2>
              {!resetSent ? (
                <form>
                  <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <button type="button" className="btn btn-primary btn-block" onClick={handleReset}>
                    Reset Password
                  </button>
                </form>
              ) : (
                <div>
                  <p className="text-success">Password reset email sent. Check your inbox for further instructions.</p>
                  <Link to="/login">Back to Login</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
