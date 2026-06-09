require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to DevTalk API!'
  });
});
app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`DevTalk server is running at http://localhost:${PORT}`);
});