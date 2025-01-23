// Import necessary libraries
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// Middleware for JSON parsing
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'learno_db',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL');
});

// API Endpoints

// 1. Fetch Quick Stats
app.get('/dashboard/quick-stats/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `SELECT learningProgress, skillsLearned, pendingTasks, completedTasks FROM UserStats WHERE userId = ?`;
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Stats not found' });
        res.json(results[0]);
    });
});

// 2. Fetch Recent Activity
app.get('/dashboard/recent-activity/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `SELECT action, timestamp FROM RecentActivity WHERE userId = ? ORDER BY timestamp DESC`;
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'No recent activity found' });
        res.json(results);
    });
});

// 3. Fetch Motivational Element
app.get('/dashboard/motivational-element', (req, res) => {
    const query = `SELECT message, category FROM MotivationalMessages ORDER BY RAND() LIMIT 1`;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'No motivational messages available' });
        res.json(results[0]);
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
