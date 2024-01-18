require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const authController = require('./controllers/authController');
const placeController = require('./controllers/placeController');
const uploadController = require('./controllers/uploadController');
const app = express();
const cors = require('cors');
// Database connection
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database is Connected !!');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

  // Midlleware

  app.use(express.json())
  app.use(express.urlencoded({extended:true}))
  app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
 }));
  app.use('/auth',authController)
  app.use('/place',placeController)
  app.use('/upload', uploadController)
 

// Server setup

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
