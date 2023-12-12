const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.POSTGRES_DB,
});

async function getUserByEmailAndPassword(email, password) {
    const query = {
        text: 'SELECT * FROM "user" WHERE email = $1 AND password = $2',
        values: [email, password],
    };

    const result = await pool.query(query);
    return result.rows[0];
}

module.exports = {
    getUserByEmailAndPassword,
};
