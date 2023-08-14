const router=require('express').Router();
const quizzesRouter=require('./quizzesRouter')

router.use('/quizzes',quizzesRouter);

module.exports=router