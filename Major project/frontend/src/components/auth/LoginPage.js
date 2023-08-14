import React, { useState } from 'react';
import './AuthForm.css'; // Import the CSS file for form styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLogin, setIsLogin] = useState(true); // State to toggle between signup and login forms

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the login API endpoint here with formData
    console.log('Login form submitted:', formData);
    // For demonstration purposes, set isLoggedIn to true
    onLogin();
    navigate('/create_quiz'); // Redirect to the QuizCreator page after login
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="auth-form-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form className="auth-form" onSubmit={isLogin ? handleSubmit : undefined}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </div>
      </form>
      <p>{isLogin ? 'Not registered yet?' : 'Already have an account?'}</p>
      <button onClick={toggleForm}>{isLogin ? 'Sign Up' : 'Login'}</button>
    </div>
  );
};

export default LoginPage;
