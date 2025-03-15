// Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'user'
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { name } = useParams(); // Extract name from URL (e.g., "john%20Doe")

  // Check if the user exists when the component mounts
  useEffect(() => {
    if (name) {
      const formattedName = name.replace('%20', ' ');
      axios.get(`http://localhost:5000/login/${name}`)
        .then(response => console.log(response.data))
        .catch(err => setError('User not found in database'));
    }
  }, [name]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: formData.email,
        password: formData.password
      });
      const { token, role, name: userName } = response.data;

      // Store token (e.g., in localStorage)
      localStorage.setItem('token', token);

      // If URL has a name, redirect to that user's page; otherwise, use role
      if (name) {
        const formattedName = name.replace('%20', ' ');
        navigate(`/user/${formattedName}`);
      } else if (role === 'user') {
        navigate('/user-dashboard');
      } else if (role === 'business_owner') {
        navigate('/BusinessDescription');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8 text-blue-600">
          {name ? `Login for ${name.replace('%20', ' ')}` : 'Login'}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="userType" className="block text-gray-700 mb-2">Login as:</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="user">User</option>
              <option value="business_owner">Business Owner</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;