const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();


app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
}));
const PORT = process.env.PORT || 4001;

app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://lokeshCluster_1:Admin123@clusterbasic.heghxo8.mongodb.net/?retryWrites=true&w=majority&appName=ClusterBasic")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

  // Routes
  app.use('/api/auth', require('./routes/auth'));

  app.use('/api/video', require('./routes/video'));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Placeholder routes
app.get('/', (req, res) => res.send('Backend running success'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
