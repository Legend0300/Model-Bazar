// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connect = require('./config/dbConnection');
// const superadminRoutes = require('./routes/superadmin');
const userRoutes = require('./routes/userRoutes');
const zoneRoutes = require('./routes/zoneRoutes');
const bazarRoutes = require('./routes/bazarRoutes');
const cityRoutes = require('./routes/cityRoutes');
const shopRoutes = require('./routes/shopRouters');
const shopHolderRoutes = require('./routes/shopHolderRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));

// connect();

app.use(express.json());

// Define your routes here
app.use('/users', userRoutes);
app.use('/zones', zoneRoutes);
app.use('/bazars', bazarRoutes);
app.use('/cities', cityRoutes);
app.use('/shops', shopRoutes);
app.use('/shop-holders', shopHolderRoutes);

app.route('/').get((req, res) => {
  res.send(':(');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
