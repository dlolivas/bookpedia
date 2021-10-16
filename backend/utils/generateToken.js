//installed to generate tokens to the user and let them access websites 
const jwt = require('jsonwebtoken');

const generateToken = userId => {
    return jwt.sign({ id: userId } , process.env.JWT_SECRET_KEY, {
        expiresIn: '30d',
    });
};

module.exports = generateToken;