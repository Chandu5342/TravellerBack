const express = require('express');

const router = express.Router();
const db = require('../config/db');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const [result] = await db.query('SELECT * FROM projects');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new project
router.post('/', async (req, res) => {
  const { title, description, category, author, image, language } = req.body;
  const sql = `INSERT INTO projects (title, description, category, author, image_url, language) VALUES (?, ?, ?, ?, ?, ?)`;
  try {
    const [result] = await db.query(sql, [title, description, category, author, image, language]);
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save project
router.post('/:id/save', async (req, res) => {
  const projectId = req.params.id;
  const sql = 'INSERT INTO saved_projects (project_id) VALUES (?)';
  try {
    await db.query(sql, [projectId]);
    res.json({ message: 'Project saved!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get saved projects
router.get('/saved', async (req, res) => {
  try {
    const [result] = await db.query('SELECT project_id FROM saved_projects');
    res.json(result.map(r => r.project_id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unsave project
router.delete('/:id/unsave', async (req, res) => {
  const projectId = req.params.id;
  const sql = 'DELETE FROM saved_projects WHERE project_id = ?';
  try {
    await db.query(sql, [projectId]);
    res.json({ message: 'Project unsaved!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  const projectId = req.params.id;
  const sql = 'DELETE FROM projects WHERE id = ?';
  try {
    await db.query(sql, [projectId]);
    res.json({ message: 'Project deleted!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
