const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Add this line

const app = express();
const port = 3000;

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sriram@92',
    database: 'sys',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.use(bodyParser.json());
app.use(cors()); // Add this line

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Received login request:', email, password);

    const query = 'SELECT * FROM sys.login WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        if (results.length > 0) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    console.log('Received signup request:', email, password);

    const query = 'INSERT INTO sys.login (email, password) VALUES (?, ?)';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        res.json({ message: 'Signup successful' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
