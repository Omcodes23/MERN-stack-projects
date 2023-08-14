import React, { useEffect, useState } from 'react';
import './styles.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useLocation} from 'react-router-dom';
import { axiosClient } from '../../utils/axiosClient';


function SingleQuiz() {
  const location = useLocation();
  var quiz_id=location?.state?.quiz_id;
  if(!quiz_id){
    window.location.replace('/error','_self');
  }

  const [progress,setProgress]=useState('All Quizzes Result');
  const [quizzes,setQuizzes]=useState([])
  useEffect(()=>{
    setProgress('Loading Desired Quiz Result');
    fetchData();
  },[])

  async function fetchData(){
    const data=await axiosClient.get(`/quizzes/${quiz_id}/result`);

    if(data?.status==='ok'){
      setQuizzes(data?.result);
      setProgress('Quiz Result');
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
    <div id="single_quiz_container">
      <ToastContainer/>
      <h1 style={{textAlign:"center"}}>{progress}</h1>
      {quizzes.map((quiz,index)=>(
          <div className="single-quiz" key={index}>
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
                  <li key={optionIndex}>
                    {option}{' '}
                    {question.correctOption === optionIndex && (
                      <span className="correct-answer">[Correct Answer]</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SingleQuiz;
