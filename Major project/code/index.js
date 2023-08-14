const express=require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors=require('cors');
const indexRouter=require('./routers/index');
const app=express();

const dbConnect=require('./dbConnect');
dbConnect();
//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('common'));
app.use(cors({
    credentials:true,
    origin:[
        'http://localhost:3000',
        'https://quiz-assignment-frontend.vercel.app'
    ]
}));
app.use('/',indexRouter);

const PORT=process.env.PORT||4001;
app.listen(PORT,()=>{
    console.log("listening on port ", PORT);
});