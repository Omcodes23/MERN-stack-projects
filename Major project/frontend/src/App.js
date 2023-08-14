import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import QuizCreator from './components/quiz_creator/QuizCreator';
import QuizList from './components/quiz_list/QuizList';
import QuizResult from './components/quiz_result/QuizResult';
import SingleQuiz from './components/single_quiz/SingleQuiz';
import ErrorPage from './components/ErrorPage/ErrorPage';
import SignupPage from './components/auth/SignupPage';
import LoginPage from './components/auth/LoginPage';
import './AuthForm.css'; // Import the CSS file for form styling

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle user login
  const handleLogin = () => {
    // Perform login logic here, e.g., API call to verify credentials
    // If login is successful, set isLoggedIn to true
    setIsLoggedIn(true);
  };

  // Callback function to avoid direct execution during HMR
  const loginCallback = () => {
    handleLogin();
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {!isLoggedIn && (
            <>
              <Route path="/" element={<SignupPage onLogin={loginCallback} />} />
              <Route path="/signup" element={<SignupPage onLogin={loginCallback} />} />
              <Route path="/login" element={<LoginPage onLogin={loginCallback} />} />
            </>
          )}
          {isLoggedIn && (
            <>
              <Route path="/" element={<QuizCreator />} />
              <Route path="/create_quiz" element={<QuizCreator />} />
              <Route path="/show_available_quizes" element={<QuizList />} />
              <Route path="/quiz_results_all" element={<QuizResult />} />
              <Route path="/show_quiz_result" element={<SingleQuiz />} />
            </>
          )}
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
