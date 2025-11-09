require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const roadmapsRouter = require('./routes/roadmaps');
const neuralseekRouter = require('./routes/neuralseek')

const app = express();
app.use(express.json()); // for parsing JSON bodies

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/roadmaps', roadmapsRouter);
app.use('/api/neuralseek', neuralseekRouter)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
