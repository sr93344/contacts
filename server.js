const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');

connectDb();
const app = express();
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});
app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(require('./middleware/errorHandler').errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});