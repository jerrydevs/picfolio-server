const mongoose = require('mongoose');
const dbURI = process.env.mongoURI

const connectToDB = async () => {
  try {
    await mongoose.connect(dbURI, {
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

module.exports = connectToDB;
