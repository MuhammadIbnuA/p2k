const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line to include the cors middleware
const dataController = require('./controller/datacontroller');

const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse incoming JSON data
app.use(express.json());

// Connect to MongoDB Atlas
const atlasUri = 'mongodb+srv://p2k:p2kfast2023@cluster0.mxkqpxc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(atlasUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error.message);
  });

// Define API routes
app.get('/api/data', dataController.getAllData);
app.get('/api/data/:nim', dataController.getDataByNim);
app.post('/api/data', dataController.addData);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
