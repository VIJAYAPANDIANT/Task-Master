// Welcome.js
import React from 'react';

const Welcome = () => {
  // Only show welcome on the home route, hide it on sub-routes if desired
  const isHome = window.location.pathname === '/home';
  
  if (!isHome) return null;

  return (
    <div className="container mt-4 mb-5">
      <div className="p-5 text-center rounded-4 shadow-sm border-0 position-relative overflow-hidden" style={{ minHeight: '300px', backgroundColor: 'var(--card-bg)' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)', zIndex: 0 }}></div>
        <div className="position-relative z-1 py-5">
            <h1 className="display-4 fw-bold mb-3" style={{ color: 'var(--text-color)', letterSpacing: '-1px' }}>
                Welcome to <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Task Master</span>
            </h1>
            <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '600px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                Experience a simple, elegant, and efficient way to manage your work. Create, organize, and track your daily goals effortlessly.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
