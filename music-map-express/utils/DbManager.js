const { Sequelize } = require('sequelize');

class DbManager {
    constructor() {
        this.sequelize = new Sequelize({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
        });
        this.User = require('../models/user')(this.sequelize, Sequelize);
    }

    async initializeDatabase() {
        try {
            await this.sequelize.authenticate();
            console.log('Database connection successful.');
            await this.sequelize.sync({ force: false });
            console.log('Database synchronized.');
            this.logUserTable();
            console.log('Users read correctly.');

        } catch (error) {
            console.error('Error connecting to the database. Retrying in ~2 seconds.');
            setTimeout(() => this.initializeDatabase(), 2000);
        }

    }
    async logUserTable() {

        try {
            const users = await this.User.findAll();
            console.log('All rows from the "user" table:', users);
        } catch (error) {
            console.error('Error querying the "user" table - Retrying in 2 seconds:', error);
            setTimeout(() => this.logUserTable(), 2000);
        }
    }

    async getUserByEmailAndPassword(email, password) {
        try {
            const user = await this.User.findOne({
                where: {
                    email: email,
                    password: password,
                },
            });

            return user;
        } catch (error) {
            console.error('Error querying the database:', error);
            throw error;
        }
    }
}

module.exports = DbManager;
