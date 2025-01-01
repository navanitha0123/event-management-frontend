import React, { useState } from 'react';
import './App.css';

function App() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [message, setMessage] = useState('');

  // Form data states
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Handle input changes for registration
  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle input changes for login
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
// Handle registration




const register = () => {
  fetch('http://localhost:8000/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData), // Ensure that registerData contains the correct fields
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          setMessage(`Error: ${errorData.message || 'Invalid data'}`);
          throw new Error(errorData.message || 'Invalid data');
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data.user) {
        setMessage('Registration successful!');
        setIsRegistering(false); // Switch to login form
      } else {
        setMessage('Registration failed!');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setMessage('An error occurred during registration.');
    });
};

const login = () => {
  fetch('http://localhost:8000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        setMessage('Login successful!');
      } else {
        setMessage('Invalid credentials');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setMessage('An error occurred during login.');
    });
};
  return (
    <div className="container">
      <h1>User Authentication</h1>

      {/* Register Form */}
      {isRegistering ? (
        <div className="form-container">
          <h2>Register</h2>
          <input
            type="text"
            name="name"
            value={registerData.name}
            onChange={handleRegisterInputChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleRegisterInputChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleRegisterInputChange}
            placeholder="Password"
            required
          />
          <button onClick={register}>Register</button>
        </div>
      ) : (
        <div className="form-container">
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleLoginInputChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginInputChange}
            placeholder="Password"
            required
          />
          <button onClick={login}>Login</button>
        </div>
      )}

      <div id="message">{message}</div>
    </div>
  );
}

export default App;
