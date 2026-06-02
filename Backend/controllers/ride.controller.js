const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');
const userModel = require('../models/user.model');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userId, pickup, destination, vechileType } = req.body;
    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vechileType });
        res.status(201).json(ride);

        // Run captain notification asynchronously after response is sent
        setImmediate(async () => {
            try {
                const pickupCoordinates = await mapService.getCoordinates(pickup);
                const captainsInRadius = await mapService.getCaptainsInRadius(pickupCoordinates.lat, pickupCoordinates.lng, 500);

                ride.otp = ""

                // Fetch the ride with populated user data
                const rideWithUser = await rideModel.findById(ride._id).populate('user', 'name email phone');

                captainsInRadius.map(captain => {
                    sendMessageToSocketId(captain.socketId, {
                        event: 'new-ride',
                        data: rideWithUser
                    });
                })
            } catch (asyncError) {
                console.error('Error sending ride to captains:', asyncError.message);
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;
    try {
        const fare = await rideService.getFare(pickup, destination);
        res.status(200).json({ fare });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try{
        const ride = await rideService.confirmRide({rideId, captain: req.captain});
        
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });
        return res.status(200).json(ride);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId,otp } = req.query;
    try{
        const ride = await rideService.startRide({rideId, otp, captain: req.captain});
        
        console.log('Ride started:', ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });
        return res.status(200).json(ride);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.query;
    try{
        const ride = await rideService.endRide({rideId, captain: req.captain});

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });

        return res.status(200).json(ride);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}