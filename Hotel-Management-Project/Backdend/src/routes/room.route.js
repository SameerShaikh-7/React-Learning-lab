const express = require('express');
const { addRoom, getAllRooms, updateRoom, deleteRoom, getSingleRoom } = require('../controllers/room.controller');

const roomRoute = express.Router();

roomRoute.post('/', addRoom);

roomRoute.get('/', getAllRooms);       

roomRoute.get('/:id', getSingleRoom); 

roomRoute.patch('/:id', updateRoom);

roomRoute.delete('/:id', deleteRoom);  

module.exports = roomRoute;