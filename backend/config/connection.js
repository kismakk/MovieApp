require('dotenv').config()
const { Pool } = require('pg')
const pgPool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PW,
  port: process.env.PG_PORT,
  ssl: true
})

pgPool.connect((err) => {
  if (err) {
    console.log(err.message)
  } else {
    console.log('Yhteys onnistui')
  }
})

module.exports = pgPool
