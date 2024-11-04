const JWT = require('jsonwebtoken');

const secret = process.env.secret;  

function createTokenUser(user,role) {
 

    const payload = {
        _id: user._id,
        email: user.email,
        name: user.FullName,
        role
    };
    console.log(payload);
    

    const token = JWT.sign(payload, secret, { expiresIn: "1d" });
    console.log(token);

    return token;
}

function validateToken(token) {
    return JWT.verify(token, secret);
}

module.exports = {
    createTokenUser,
    validateToken
};
