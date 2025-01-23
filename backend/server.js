const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwerty",
  database: "learno_db",
  port:3306,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// Login Route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM Users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).send({ message: "Database error." });

    if (results.length === 0)
      return res.status(404).send({ message: "User not found." });

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid)
      return res.status(401).send({ message: "Invalid credentials." });

    const token = jwt.sign({ id: user.id, role: user.role }, "secret_key", {
      expiresIn: "1h",
    });

    res.send({ message: "Login successful!", token });
  });
});

//SignUp Route

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check if email already exists
    const [existingUser] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?",[email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Email already registered or Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    await db
      .promise()
      .query("INSERT INTO Users (username, email, password) VALUES (?, ?, ?)", [
        name,
        email,
        hashedPassword,
      ]);

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

//1. Fetch Quick Stats
app.get('/dashboard/quick-stats/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = `SELECT learningProgress, skillsLearned, pendingTasks, completedTasks FROM UserStats WHERE userId = ?`;
  db.query(query, [userId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'Stats not found' });
      res.json(results[0]);
  });
});

// // 2. Fetch Recent Activity
// app.get('/dashboard/recent-activity/:userId', (req, res) => {
//   const userId = req.params.userId;
//   const query = `SELECT action, timestamp FROM RecentActivity WHERE userId = ? ORDER BY timestamp DESC`;
//   db.query(query, [userId], (err, results) => {
//       if (err) return res.status(500).json({ error: err.message });
//       if (results.length === 0) return res.status(404).json({ message: 'No recent activity found' });
//       res.json(results);
//   });
// });

// // 3. Fetch Motivational Element
// app.get('/dashboard/motivational-element', (req, res) => {
//   const query = `SELECT message, category FROM MotivationalMessages ORDER BY RAND() LIMIT 1`;
//   db.query(query, (err, results) => {
//       if (err) return res.status(500).json({ error: err.message });
//       if (results.length === 0) return res.status(404).json({ message: 'No motivational messages available' });
//       res.json(results[0]);
//   });
// });


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
