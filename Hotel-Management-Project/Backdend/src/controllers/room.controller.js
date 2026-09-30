const Room = require('../models/room.model');

exports.addRoom = async (req, res) => {
    try {
        const newRoom = await Room.create(req.body);
        return res.status(201).json({
            status: 201,
            message: "Room added successfully.",
            data: newRoom,
            error: false
        });
    } catch (e) {
        console.log("Add Room Exception : ", e);
        return res.status(500).json({ status: 500, message: "Something went wrong...", error: true });
    }
}

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        return res.status(200).json({
            status: 200,
            message: "Rooms fetched successfully.",
            data: rooms,
            error: false
        });
    } catch (e) {
        console.log("View Rooms Exception : ", e);
        return res.status(500).json({ status: 500, message: "Something went wrong...", error: true });
    }
}

exports.getSingleRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: "Room not found" });

        return res.status(200).json({
            status: 200,
            message: "Room fetched successfully.",
            data: room,
            error: false
        });
    } catch (e) {
        console.log("Single Room Exception : ", e);
        return res.status(500).json({ status: 500, message: "Something went wrong...", error: true });
    }
}

exports.updateRoom = async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({
            status: 200,
            message: "Room updated successfully.",
            data: updatedRoom,
            error: false
        });
    } catch (e) {
        console.log("Update Room Exception : ", e);
        return res.status(500).json({ status: 500, message: "Something went wrong...", error: true });
    }
}

exports.deleteRoom = async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status: 200,
            message: "Room deleted successfully.",
            error: false
        });
    } catch (e) {
        console.log("Delete Room Exception : ", e);
        return res.status(500).json({ status: 500, message: "Something went wrong...", error: true });
    }
}