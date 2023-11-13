const pgPool = require('../config/connection.js')
const bcrypt = require('bcrypt')

const sql = {
    create: 'INSERT INTO users (uname, pw, email) VALUES ($1, $2, $3)'
}

const createUser = async (userData) => {
    const { uname, pw, email } = userData;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(pw, saltRounds);
    const values = [uname, passwordHash, email];
    try {
        const result = await pgPool.query(sql.create, values);
        return result;
    } catch (error) {
        console.log('Error in createUser', error);
        return error;
    }    
}

module.exports = {
    createUser
}