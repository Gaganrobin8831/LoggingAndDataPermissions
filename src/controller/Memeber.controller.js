const User = require('../models/Memeber.models')
const bcrypt = require('bcrypt')
const path = require('path');
const { createTokenUser } = require('../middleware/validate');
const { validationErrorResponse, successResponse } = require('../utility/response');
const Activity = require('../models/activity.models');
const { HandleCreateActivityuLog } = require('../utility/createActivit');
const validator = require('validator')

function isValidEmail(email) {
    return validator.isEmail(email);
}

async function HandleRegester(req, res) {


    const { fullName, email, password, role } = req.body // validation needed
    // regex , 
    console.log({ fullName, email, password, role })

    try {

        if (isValidEmail(email) == false) {
            return validationErrorResponse(res, "error", "Enter Valid Email", 409)
        }

        if (!fullName || !email || !password || !role) {
            return validationErrorResponse(res, "error", "Enter FullName email passeord and role", 409)
        }
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            let error = "Already Regester"
            let message = 'You already have an account. Please login'
            //   return res.render('login', { message: 'You already have an account. Please login.' });
            return validationErrorResponse(res, error, message, 409)

        }

        const hasPasword = await bcrypt.hash(password, 10);
        const ResgeterUser = new User({
            FullName: fullName, //FullName
            email,
            password: hasPasword,
            role

        })
        await ResgeterUser.save()
        return successResponse(res, ResgeterUser, "Success", 200)
    } catch (error) {
        console.log(error);
        return validationErrorResponse(res, error, "Something Wrong", 400)

    }

}


async function HandleLogin(req, res) {
    const { email, password } = req.body;
    try {
        if (isValidEmail(email) == false) {
            return validationErrorResponse(res, "error", "Enter Valid Email", 409)
        }

        if (!email || !password ) {
            return validationErrorResponse(res, "error", "Enter email passeord ", 409)
        }
        let token

        const user = await User.findOne({ email });
        if (!user) {
            return validationErrorResponse(res, error, 'Invalid email or password', 400)
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return validationErrorResponse(res, error, 'Invalid email or password', 400)
        }

        role = user.role
        token = createTokenUser(user, role = role);

        HandleCreateActivityuLog(`create the New User`, role, user, user, "Add", user.FullName)




        res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        let data = {
            email,
            password
        }
        return successResponse(res, data, "Login Success", 200)
    } catch (error) {
        console.log(error);
        return validationErrorResponse(res, error, "Something Wrong", 400)
    }
}




module.exports = {
    HandleRegester,
    HandleLogin

}