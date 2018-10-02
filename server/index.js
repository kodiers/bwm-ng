const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const FakeDB = require('./fake-db');

const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');


mongoose.connect(config.DB_URI, {
  "auth": { "authSource": config.authSource },
  "user": config.user,
  "pass": config.pass
}).then(() => {
  const fakeDb = new FakeDB();
  fakeDb.seedDB();
});


const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);


const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log('I am running');
});
