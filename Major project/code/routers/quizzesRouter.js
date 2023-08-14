const router=require('express').Router();
const quizController=require('../controllers/quizController');

//It will create quizes
router.post('/',quizController.addQuiz);

//It will return only active quizzes
router.get('/active',quizController.getActiveQuizes);

//It will return all quizes whose results can be seen
router.get('/all',quizController.getEndedQuizes);   

//It will return single quiz whose id will match as in params
router.get('/:id/result',quizController.getQuizById);    

module.exports=router

