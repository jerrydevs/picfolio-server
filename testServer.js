const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1/picfolio', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Connected to MongoDB Server...');
  } catch (err) {
    console.error(err.message);

    process.exit(1);
  }
};

// Connect to Database
connectToDB();

app.use(express.json({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('API is now running...'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/photo', require('./routes/api/photo'));
app.use('/api/profilePhoto', require('./routes/api/profilePhoto'));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});

module.exports = app;
