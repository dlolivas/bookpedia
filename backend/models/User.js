const mongoose = require('mongoose');
//protect password from hackers bcrypt
const bcrypt = require('bcryptjs');


//Create Schema Register
const UserSchema = new mongoose.Schema({
    name: {

        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type:String,
        required: true,
    },
});

//hashing users password
UserSchema.pre('save' , async function(next){


    const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();

});

//verify password match so users can enter succesfully
UserSchema.methods.isPasswordMatch = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};


//create user 
const User = mongoose.model('User' , UserSchema);

module.exports = User;