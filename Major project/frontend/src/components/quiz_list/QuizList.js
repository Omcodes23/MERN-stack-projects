import React, { useEffect, useState } from 'react';
import './styles.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosClient } from '../../utils/axiosClient';

function QuizList(){

  const [quizzes,setQuizzes]=useState([])
  const [progress,setProgress]=useState('All Active Quizzes')

  useEffect(()=>{
    setProgress('Loading Data');
    fetchData();
  },[])

  async function fetchData(){
    const data=await axiosClient.get('/quizzes/active');

    if(data?.status==='ok'){
      setQuizzes(data?.result);
      setProgress('All Active Quizzes')
    }else{
      setProgress('some error occured reload the page');
      showAlert(data?.result)
    }
  }

  const showAlert = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  const showSuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER
    });
  };


  return (
    <div id="quiz_list_container">
      <ToastContainer/>
    <h1 style={{textAlign:"center"}}>{progress}</h1>
    <div className="quiz-list">
      {quizzes.map((quiz, index) => (
        <div className="quiz" key={index}>
          <h2>{quiz.quizName}</h2>
          <p>
            Start Date: {quiz.startDate}, End Date: {quiz.endDate}
          </p>
          {quiz.questions.map((question, questionIndex) => (
            <div className="question" key={questionIndex}>
              <h3>Question {questionIndex + 1}</h3>
              <p>{question.question}</p>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>{option}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
    </div>
  );
};

export default QuizList;
