require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
const userRoutes = require('./routes/userRoutes.js');

app.use('/users', userRoutes);

// Server start
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// For testing purposes
module.exports = app;
