import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Fixed incorrect import

const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();  

  // Handle input changes
  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response Data:', data);

      // Store in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Navigate to Dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <h1>login page</h1>
      <input
        type="email"
        name="email"
        value={login.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />
      <input
        type="password"
        name="password"
        value={login.password}
        onChange={handleChange}
        placeholder="Enter your password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
