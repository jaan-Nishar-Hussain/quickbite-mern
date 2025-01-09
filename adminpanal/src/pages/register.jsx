import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [register, setRegister] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    address: '',
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(register),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Registration Response:', data);

      // Navigate to login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register as Admin</h1>

      <input
        type="text"
        name="firstname"
        value={register.firstname}
        onChange={handleChange}
        placeholder="Enter your first name"
        required
      />
      <input
        type="text"
        name="lastname"
        value={register.lastname}
        onChange={handleChange}
        placeholder="Enter your last name"
        required
      />
      <input
        type="email"
        name="email"
        value={register.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />
      <input
        type="text"
        name="phone"
        value={register.phone}
        onChange={handleChange}
        placeholder="Enter your phone number"
        required
      />
      <input
        type="password"
        name="password"
        value={register.password}
        onChange={handleChange}
        placeholder="Enter your password"
        required
      />
      <input
        type="text"
        name="address"
        value={register.address}
        onChange={handleChange}
        placeholder="Enter your address"
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
