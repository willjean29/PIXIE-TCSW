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

// endpoints for catalog
app.use('/catalog',require('./catalog'));

// endopoints for prizes
app.use('/prize',require('./prize'));

// endpoints for categories
app.use('/category',require('./category'));


module.exports = app;