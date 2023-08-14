function validateQuiz(quiz) {
    try {
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
    } catch (e) {
       console.log("Quiz validation error ",e);
       return false; 
    }
  }
  
function validateQuizArray(quizArray) {
    // Verify if the quizArray is an array
    if (!Array.isArray(quizArray)) {
      return false;
    }
  
    // Verify each quiz in the array using the verifyQuiz function
    for (const quiz of quizArray) {
      if (!validateQuiz(quiz)) {
        return false;
      }
    }
    // If all quizzes pass verification, return true
    return true;
}  

export {
  validateQuiz,
  validateQuizArray
}