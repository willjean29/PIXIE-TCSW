const express = require('express');
const app = express();
// globals routes

// endpoints for admin
app.use('/admin', require('./admin'));

// endpoints for client
// app.use('/client', require('./client'));

// endpoints for webmaster
app.use('/webMaster',require('./webMaster'));

// endpoints for businness
app.use('/business',require('./business'));

// endpoints for competitionSchema
app.use('/competition',require('./competition'));


module.exports = app;