const {User} = require('../../models/user')
const validator = require('validator');
const _ = require = require('lodash');

module.exports.validatePostUser = async (req, res, next) => {
    const {email, password, password2, fullname} = req.body;
    let errors = {};

    // emails
    if(!email){
        errors.email = "Email is required"
    } else if(!validator.isEmail(email)){
        errors.email = "Email is invalid"
    } else{
        
    }

    // password
    if(!password){
        errors.password = "password is required"
    } else if(!validator.isLength(password, {min: 6})){
        errors.password = "password must have at least 6 characters"
    }

    // password 2
    if(!password2){
        errors.password2 = "password2 is required"
    } else if(!validator.equals(password, password2)){
        errors.password2 = "password must match"
    }

    if(_.isEmpty(errors)){
        // thuc hien request db de kiem tra tiep
        const user = await User.findOne({email});

        if(user) errors.email = "Email exists"
        else return next();
    }
    return res.status(400).json(errors);
}