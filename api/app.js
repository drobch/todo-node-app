require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');
const { PublicRoutes, PrivateRoutes } = require('./routes');

// const isProduction = process.env.NODE_ENV === 'production';

const app = new express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect(config.database, { useNewUrlParser: true })
  .then(() => console.log('Connected Successfully to MongoDB'))
  .catch(err => console.error(err));

mongoose.set('debug', true);

app.use('/', PublicRoutes);
app.use('/', PrivateRoutes);


app.listen(process.env.PORT, (err) => {
  if (err) console.error(err);
  console.log(`Server running on port ${ process.env.PORT }`);
});
