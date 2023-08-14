import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AuthForm.css'; // Import the CSS file for form styling

const SignupPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const location = useLocation(); // Get the current location object
  const navigate = useNavigate(); // Initialize useNavigate hook

  const isLoginPage = location.pathname === '/login'; // Check if the current page is login page

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the signup API endpoint here with formData
    console.log('Signup form submitted:', formData);
    // For demonstration purposes, set isLoggedIn to true
    onLogin();
    navigate('/create_quiz'); // Redirect to the QuizCreator page after signup
  };

  const toggleForm = () => {
    if (isLoginPage) {
      navigate('/signup');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="auth-form-container">
     
      <button onClick={toggleForm}>Enter the Quiz</button>
    </div>
  );
};

export default SignupPage;
