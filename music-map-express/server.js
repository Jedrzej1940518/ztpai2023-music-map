const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3001;

const festivalRouter = require('./routes/festival');

app.use(express.json());

app.use('/api/festivals', festivalRouter);

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.POSTGRES_DB,
});

async function logUserTable() {
  try {
    const result = await pool.query('SELECT * FROM "user"');
    const users = result.rows;
    console.log('All rows from the "user" table:', users);
  } catch (error) {
    console.error('Error querying the "user" table:', error);
  }
}

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        id SERIAL PRIMARY KEY,
        nickname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);

    await pool.query(`
      INSERT INTO "user" (nickname, email, password) VALUES ($1, $2, $3)
    `, ['Ala', 'ala@wp.pl', 'ala']);

    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

async function checkDatabaseConnection() {
  try {
    await pool.query('SELECT 1');
    console.log('Database connection successful.');
    initializeDatabase();
    setTimeout(logUserTable, 2000);
  } catch (error) {
    console.error('Error connecting to the database. Retrying in ~2 seconds.');
    setTimeout(checkDatabaseConnection, 2000);
  }
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  checkDatabaseConnection();
});
