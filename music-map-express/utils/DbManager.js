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
        //this.User = require('../models/User2');

    }

    async logUserTable() {
        try {
            const result = await this.sequelize.query('SELECT * FROM "user"');
            const users = result[0];
            console.log('All rows from the "user" table:', users);
        } catch (error) {
            console.error('Error querying the "user" table - Retrying in 2 seconds:', error);
            setTimeout(() => this.logUserTable(), 2000);
        }
    }

    async insertDummyValues() {
        try {
            await this.sequelize.query(`
        CREATE TABLE IF NOT EXISTS "user" (
          id SERIAL PRIMARY KEY,
          nickname VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        )
      `);

            await this.sequelize.query(`
  INSERT INTO "user" (nickname, email, password) VALUES (?, ?, ?)
`, { replacements: ['Ala', 'ala@wp.pl', 'ala'], type: this.sequelize.QueryTypes.INSERT });


            console.log('Database initialized successfully.');
        } catch (error) {
            console.error('Error initializing database:', error);
        }
    }

    async initializeDatabase() {
        try {
            await this.sequelize.authenticate();
            console.log('Database connection successful.');
            await this.sequelize.sync({ force: false });
            console.log('Database synchronized.');

        } catch (error) {
            console.error('Error connecting to the database. Retrying in ~2 seconds.');
            setTimeout(() => this.initializeDatabase(), 2000);
        }

        this.insertDummyValues();
        this.logUserTable();
    }

    // async getUserByEmailAndPassword(email, password) {
    //     try {
    //         const user = await this.User.findOne({
    //             where: {
    //                 email: email,
    //                 password: password,
    //             },
    //         });

    //         return user;
    //     } catch (error) {
    //         console.error('Error querying the database:', error);
    //         throw error;
    //     }
    // }
}

module.exports = DbManager;
