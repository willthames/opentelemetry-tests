require('pg');

const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool()

async function get() {
  try {
    const {rows} = await pool.query('SELECT key, value FROM items');
    return rows;
  } catch (err) {
    console.log(err.stack)
    return {}
  }
}

async function put(key, value) {
  const text = 'INSERT INTO items (key, value) VALUES($1, $2) RETURNING *'
  const values = [key, value]

  try {
    const {rows} =  await pool.query(text, values);
    return rows;
  } catch (err) {
    console.log(err.stack)
    return {}
  }
}

module.exports = {put, get}
