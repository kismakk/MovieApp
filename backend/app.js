require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const { errorHandler, notFound } = require('./middleware/errorhandler.js');
const app = express();

// Require routes
const userRoutes = require('./routes/userRoutes.js');
/* const groupRoutes = require('./routes/groupRoutes.js'); */
const favouriteRoutes = require('./routes/favouriteRoutes.js');

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Require routes
const userRoutes = require('./routes/userRoutes.js');
const groupRoutes = require('./routes/groupRoutes.js');

// Routes
app.use('/users', userRoutes);
/* app.use('/groups', groupRoutes); */
app.use('/favourites', favouriteRoutes);  

// Server start
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// For testing purposes
module.exports = app;
