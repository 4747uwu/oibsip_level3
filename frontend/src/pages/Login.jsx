import React, { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { getAuthState } = useContext(AppContext);
  const navigate = useNavigate();

  const backendUrl = 'http://localhost:5000';
  const [currentState, setCurrentState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
    try {
      if (currentState === 'Sign Up') {
        const response = await fetch(`${backendUrl}/api/auth/register`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);

        if (data.success) {
          console.log('User registered successfully');
          await getAuthState();
          navigate('/');
        }
      } else {
        const response = await fetch(`${backendUrl}/api/auth/login`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);

        if (data.success) {
          await getAuthState();
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Signup error:', error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      
    >
      <form
        onSubmit={onSubmitHandler}
        className="bg-white border border-black bg-opacity-80 rounded-lg shadow-xl p-10 w-full sm:w-96 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-gray-800">{currentState}</h2>
          <hr className="border-t-2 border-gray-800 w-1/4 mx-auto mt-2" />
        </div>

        {currentState === 'Login' ? '' : (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
        />

        <div className="w-full flex justify-between text-sm mt-4">
          {currentState === 'Login' ? (
            <p
              onClick={() => navigate('/reset-password')}
              className="cursor-pointer text-indigo-600 hover:text-indigo-800 transition duration-300"
            >
              Forgot your password?
            </p>
          ) : (
            ''
          )}
          {currentState === 'Login' ? (
            <p
              onClick={() => setCurrentState('Sign Up')}
              className="cursor-pointer text-indigo-600 hover:text-indigo-800 transition duration-300"
            >
              New User? Sign Up
            </p>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className="cursor-pointer text-indigo-600 hover:text-indigo-800 transition duration-300"
            >
              Already a User? Login
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 rounded-full py-3 text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105"
        >
          {currentState === 'Sign Up' ? 'Sign Up' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
