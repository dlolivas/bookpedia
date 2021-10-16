const express = require('express');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

const usersRoute = express.Router();



//register route 
usersRoute.post('/register' , asyncHandler(async (req,res) => {
const { name, email, password} = req.body;

const userExists = await User.findOne({ email:email});
if(userExists) {
    throw new Error('User Exist');
}
const userCreated = await User.create({ email, name, password});
res.json({
    _id: userCreated.id,
    name: userCreated.name,
    password: userCreated.password,
    email:userCreated.password,
    token: generateToken(userCreated._id),
});
}));

//login route 
usersRoute.post('/login', asyncHandler(async (req,res) => {
    //credntials 
    const {email, password } = req.body;

    //check to see if we have their data on our website 
    const user = await User.findOne({email});
    
    if (user && (await user.isPasswordMatch(password)))  {
        //set status code to make sure its working
        res.status(200);
        //when everything is okay send msj
        res.json({
            _id: user.id,
            name: user.name,
            password: user.password,
            email:user.password,
            token: generateToken(user._id),
        });
        //incase an err occurs 
    } else {
        res.status(401);
        throw new Error('Invalid Credentials');
    
    }
 }) 
);

//update user
usersRoute.put('/update' , (req, res) => {
    res.send('update route');
});
//Delete user
usersRoute.delete('/:id' , (req, res) =>{
    res.send('Delete route');
});

//fetch Users
usersRoute.get('/' , (req, res) => {
    res.send('Fetch Users');
});



module.exports = usersRoute;