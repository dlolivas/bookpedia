//require express
const express = require('express');
const dotenv = require('dotenv');
const error = require('./middlewares/errorMiddlewareHandler');
const usersRoute = require('./routes/usersRoute');
const bookRouter = require('./routes/bookRoutes');
dotenv.config(); 
require('./config/dbConnect')();


const app = express();

//pass body data
app.use(express.json());




//routes will catch any usersRoute
//Users
app.use('/api/users' , usersRoute );
app.use('/api/books' , bookRouter);
console.log(process.env.MY_NAME);



//catch exceptions error middleware 
app.use(error.errorMiddlewareHandler); 

//USED WHEN DEPLOYED TO HEROKU SERVER
const PORT = process.env.PORT || 5000
app.listen(5000, () => {
    console.log(` Server is up and running ${PORT}`);
});


//dan;
//uX4WsLtRb0I51NCk;
//mongodb+srv://dan:<password>@cluster0.4fsdj.mongodb.net/test

