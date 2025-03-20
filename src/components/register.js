import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      var regData = await axios.post(`${apiUrl}/register`, { username, password });
      alert('Registration successful. You can now log in.');
      //console.log(regData);
      navigate('/login');
    } catch (error) {
      alert('Registration failed.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} 
            onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} 
            onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
