const jwt = require('jsonwebtoken');

class JWTManager {
    constructor() {
        this.secret = process.env.JWT_SECRET || 'defaultSecret';
        this.expiresIn = '1h';
    }


    generateToken(user) {
        const payload = {
            userId: user.id,
            email: user.email,
        };

        const token = jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
        return token;
    }
}

module.exports = JWTManager;
