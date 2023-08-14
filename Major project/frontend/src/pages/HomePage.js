import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Quiz App!</h1>
      <Link to="/signup">
        <button>Enter the Quiz</button>
      </Link>
    </div>
  );
};

export default HomePage;
