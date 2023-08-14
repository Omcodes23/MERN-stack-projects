const {success, error}=require("../utils/responseWrapper");

const Quiz = require('../models/Quiz'); 

const getActiveQuizes=async(req,res)=>{
  try {
    const currentDate = new Date().toISOString();

    const activeQuizzes = await Quiz.find({
        startDate: { $lte: currentDate },
        endDate: { $gt: currentDate },
    },{ 'questions.correctOption': 0 });      

    return res.send(success(200,activeQuizzes));
  } catch (e) {
    return res.send(error(500,e.message));
  }
}

const getQuizById=async(req,res)=>{
  try {
      //checking time constraints also whether my this quiz with given id has 
      //completed or not.
      const currentDateIST = new Date().toISOString();
      const pastDate = new Date(currentDateIST);
      pastDate.setMinutes(pastDate.getMinutes() - 5);
    
      const quizId = req.params.id;
      const quiz = await Quiz.find({
        _id:quizId,
        endDate: { $lt: pastDate }
      });
      if (!quiz) {
        return res.send(error(404,"Quiz not found"));
      }
      return res.send(success(200,quiz));
  } catch (e) {
      return res.send(error(500,e.message));
  }
}

const getEndedQuizes=async(req,res)=>{
    try {
        const currentDateIST = new Date().toISOString();
        const pastDate = new Date(currentDateIST);
        pastDate.setMinutes(pastDate.getMinutes() - 5);

        const endedQuizes = await Quiz.find({
          endDate: { $lt: pastDate },
        });
    
        return res.send(success(200,endedQuizes));
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

const addQuiz=async(req,res) =>{
    try {
      const quiz = JSON.parse(req.body.quiz);
      if (!isValidQuiz(quiz)) {
        return res.send(error(400,"Invalid Quiz"));
      }
      const newQuiz = new Quiz(quiz);
      
      const savedQuiz = await newQuiz.save();
      
      return res.send(success(201,savedQuiz))
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

function isValidQuiz(quiz) {
  if (
    !quiz.quizName ||
    !quiz.startDate ||
    !quiz.endDate ||
    !Array.isArray(quiz.questions) ||
    quiz.questions.length === 0
  ) {
    return false;
  }

  const startDate = new Date(quiz.startDate);
  const endDate = new Date(quiz.endDate);

  if (endDate <= startDate) {
    return false;
  }

  // Additional validation checks for each question in the quiz
  for (const question of quiz.questions) {
    if (
      !question.question ||
      !Array.isArray(question.options) ||
      question.options.length !== 4 ||
      question.correctOption === undefined ||
      question.correctOption < 0 ||
      question.correctOption > 3
    ) {
      return false;
    }
  }

  // Quiz is valid
  return true;
}

module.exports={
    getActiveQuizes,
    getEndedQuizes,
    addQuiz,
    getQuizById
}
