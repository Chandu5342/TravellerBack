const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Chandu@2025!',
  database: 'traveller_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// Test route
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// GET all projects
app.get('/projects', (req, res) => {
    db.query('SELECT * FROM projects', (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    });
  });
  
  // POST new project
  app.post('/projects', (req, res) => {
    const { title, description, category, author, image, language } = req.body;
    const sql = `INSERT INTO projects (title, description, category, author, image_url, language) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [title, description, category, author, image, language], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
  
      res.json({ id: result.insertId, ...req.body });
    });
  });
  
  app.post('/projects/:id/save', (req, res) => {
    const projectId = req.params.id;
    const sql = 'INSERT INTO saved_projects (project_id) VALUES (?)';
  
    db.query(sql, [projectId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Project saved!' });
    });
  });


  app.get('/projects/saved', (req, res) => {
    console.log("✅ GET /projects/saved route called");
    db.query('SELECT project_id FROM saved_projects', (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result.map(r => r.project_id));
    });
  });


  app.delete('/projects/:id/unsave', (req, res) => {
    const projectId = req.params.id;
    const sql = 'DELETE FROM saved_projects WHERE project_id = ?';
  
    db.query(sql, [projectId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Project unsaved!' });
    });
  });
  app.delete('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const sql = 'DELETE FROM projects WHERE id = ?';
  
    db.query(sql, [projectId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Project deleted!' });
    });
  });
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
