import React, { useState } from 'react';
import './styles.scss'
import { validateQuiz, validateQuizArray } from '../../utils/validateQuizObject';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {axiosClient} from '../../utils/axiosClient';


function QuizCreator(){
  const [quizName, setQuizName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleQuizNameChange = (event) => {
    setQuizName(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleQuestionChange = (event, index) => {
    const { name, value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (event, questionIndex, optionIndex) => {
    const { value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (event, index) => {
    const { value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctOption = parseInt(value, 10);
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctOption: 0,
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuizSubmit = async() => {
    const quizData = {
      quizName,
      startDate,
      endDate,
      questions,
    };

    // Send quizData to the server
    if(!validateQuiz(quizData)){
      showAlert("Invalid Quiz Submission fill all details");
    }

    quizData.startDate=new Date(startDate).toISOString();
    
    quizData.endDate=new Date(endDate).toISOString();

    const quizJson=JSON.stringify(quizData)
    const data=await axiosClient.post('quizzes/',{quiz:quizJson});

    if(data?.status==='ok'){
      showSuccess("Form Created successfully");
      setEndDate('')
      setStartDate('')
      setQuizName('')
      setQuestions([])
    }else{
      showAlert(data?.result)
    }
  };

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
    <div id="quiz_creator_container">
      <ToastContainer/>
    <div className="quiz-creator">
      <h2>Quiz Creator</h2>
      <div>
        <label>Quiz Name:</label>
        <input type="text" value={quizName} onChange={handleQuizNameChange} />
      </div>
      <div>
        <label>Start Date:</label>
        <input type="datetime-local" value={startDate} onChange={handleStartDateChange} />
      </div>
      <div>
        <label>End Date:</label>
        <input type="datetime-local" value={endDate} onChange={handleEndDateChange} />
      </div>
      <h3>Questions</h3>
      {questions.map((question, index) => (
        <div className="question_box" key={index}>
          <h4>Question {index + 1}</h4>
          <div>
            <label>Question:</label>
            <input
              type="text"
              value={question.question}
              name="question"
              onChange={(event) => handleQuestionChange(event, index)}
            />
          </div>
          <div>
            <label>Options:</label>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="text"
                  value={option}
                  onChange={(event) => handleOptionChange(event, index, optionIndex)}
                />
              </div>
            ))}
          </div>
          <div>
            <label>Correct Option:</label>
            <select
              value={question.correctOption}
              onChange={(event) => handleCorrectOptionChange(event, index)}
            >
              {question.options.map((_, optionIndex) => (
                <option key={optionIndex} value={optionIndex}>
                  Option {optionIndex + 1}
                </option>
              ))}
            </select>
          </div>
          <button style={{backgroundColor:"red"}} onClick={() => handleRemoveQuestion(index)}>Remove Question</button>
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleQuizSubmit}>Submit Quiz</button>
    </div>
    </div>
  );
};

export default QuizCreator;
