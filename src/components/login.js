import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  //const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/login/read`, { username, password });
      localStorage.setItem('token', response.data.token);
      console.log(response.data);
     // const oauthRes = await axios.get('${apiUrl}/login/login');
      //localStorage.setItem('access-token', oauthRes.data.token);
      history('/dashboard');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} 
            onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} 
            onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p>Register<a href={'/register'}>here</a></p>
    </div>
  );
};

export default Login;
