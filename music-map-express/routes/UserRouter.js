const express = require('express');
const DbManager = require('../utils/DbManager');
const config = require('../config/config');

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
}

module.exports = UserRouter;
