const express = require('express');
const cors = require('cors');
require('dotenv').config();

const projectRoutes = require('./routes/projectRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/projects', projectRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
