const express = require('express');
const cors = require('cors')
const pool = require('./src/db.js')
const app = express();
const PORT = 3000

app.use(cors())
app.use(express.json())





app.get('/', async (req, res) => {
    const colleges_data = await pool.query('SELECT * FROM colleges');
    const departments_data = await pool.query('SELECT * FROM departments')
    const courses_data = await pool.query('SELECT * FROM courses')
    const courses = courses_data.rows
    const departments = departments_data.rows
    const colleges = colleges_data.rows

    res.send({ message: 'Hey', colleges, departments, courses })
})


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);

})