// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const superadminRoutes = require('./routes/superadmin');
const userRoutes = require('./routes/userRoutes')


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(express.json());

// Define your routes here
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});