const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all projects
router.get('/', (req, res) => {
  db.query('SELECT * FROM projects', (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Add new project
router.post('/', (req, res) => {
  const { title, description, category, author, image, language } = req.body;
  const sql = `INSERT INTO projects (title, description, category, author, image_url, language) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [title, description, category, author, image, language], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, ...req.body });
  });
});

// Save project
router.post('/:id/save', (req, res) => {
  const projectId = req.params.id;
  const sql = 'INSERT INTO saved_projects (project_id) VALUES (?)';
  db.query(sql, [projectId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Project saved!' });
  });
});

// Get saved projects
router.get('/saved', (req, res) => {
  db.query('SELECT project_id FROM saved_projects', (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result.map(r => r.project_id));
  });
});

// Unsave project
router.delete('/:id/unsave', (req, res) => {
  const projectId = req.params.id;
  const sql = 'DELETE FROM saved_projects WHERE project_id = ?';
  db.query(sql, [projectId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Project unsaved!' });
  });
});

// Delete project
router.delete('/:id', (req, res) => {
  const projectId = req.params.id;
  const sql = 'DELETE FROM projects WHERE id = ?';
  db.query(sql, [projectId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Project deleted!' });
  });
});

module.exports = router;
