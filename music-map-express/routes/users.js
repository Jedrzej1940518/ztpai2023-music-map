const express = require('express');
const router = express.Router();

const db = require('../database/db');

router.get('/', (req, res) => {
    res.json({ message: 'UserApi' });
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `Szczegóły usera o ID ${userId}` });
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.getUserByEmailAndPassword(email, password);

        if (user) {
            res.status(200).json({ success: true, message: 'Sign in successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});



module.exports = router;
