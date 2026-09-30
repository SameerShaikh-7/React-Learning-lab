const express = require('express');
const route = express.Router();

route.use('/rooms', require('./room.route'));

module.exports = route;