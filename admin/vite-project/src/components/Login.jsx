import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/auth/admin', { email, password });

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-red-50 to-yellow-100">
      {/* Background pizza image */}
      <div className="absolute inset-0  bg-cover bg-center opacity-10"></div>

      <div className="relative bg-white bg-opacity-90 p-8 rounded-3xl shadow-2xl w-full max-w-md">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-yellow-600 mb-8">
          🍕 Admin Login
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-yellow-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-yellow-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 text-white rounded-lg text-lg font-semibold hover:from-yellow-500 hover:via-red-600 hover:to-yellow-500 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact{' '}
            <span className="font-bold text-yellow-600">admin@pizzashop.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
