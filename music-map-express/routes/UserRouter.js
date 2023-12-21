const express = require('express');
const DbManager = require('../utils/DbManager');
const config = require('../config/config');
const validator = require('validator');

class UserRouter {
    constructor() {
        this.router = express.Router();
        this.db = new DbManager();

        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', this.getUserApi.bind(this));
        this.router.get('/:id', this.getUserDetails.bind(this));
        this.router.post(config.singInApi, this.signIn.bind(this));
        this.router.post(config.registerApi, this.register.bind(this));
    }

    async getUserApi(req, res) {
        res.json({ message: 'UserApi' });
    }

    async getUserDetails(req, res) {
        const userId = req.params.id;
        res.json({ message: `Szczegóły usera o ID ${userId}` });
    }

    async signIn(req, res) {
        const { email, password } = req.body;

        try {
            const user = await this.db.getUserByEmailAndPassword(email, password);

            if (user) {
                res.status(200).json({ success: true, message: 'Sign in successful', user: user });
            } else {
                res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
        } catch (error) {
            console.error('Error querying the database:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
    async register(req, res) {
        const { email, nickname, password, repPassword } = req.body;

        try {
            const user = await this.db.getUserByEmail(email);

            if (user) {
                res.status(401).json({ success: false, message: 'Email already registred!' });
            } else if (password != repPassword) {
                res.status(401).json({ success: false, message: 'Passwords don\'t match!' });
            } else if (!validator.isEmail(email)) {
                res.status(401).json({ success: false, message: 'Invalid email!' });
            }
            else {
                this.db.registerUser(email, nickname, password).then((result) => {
                    if (result.success) {
                        console.log('Registration successful!');
                        res.status(200).json({ success: true, message: 'User registered', user: user });
                    } else {
                        console.error('Registration failed:', result.error);
                        res.status(401).json({ success: false, message: result.error });
                    }
                })
            }
        } catch (error) {
            console.error('Error querying the database:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}

module.exports = UserRouter;
