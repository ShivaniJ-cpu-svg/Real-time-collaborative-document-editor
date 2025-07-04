import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!userId.trim()) return alert('Enter a User ID');
    navigate(`/editor/${userId}`);
  };

  const generateUserId = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    setUserId(newId);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2> Collaborative Document Editor</h2>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <div className="login-buttons">
          <button onClick={handleJoin}>Join</button>
          <button onClick={generateUserId}>Generate User ID</button>
        </div>
      </div>
    </div>
  );
}

export default Login;

