// jwt.js
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        userId: user.id,
        email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

module.exports = {
    generateToken,
};
