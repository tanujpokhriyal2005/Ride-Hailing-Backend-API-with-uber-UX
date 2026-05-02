const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const {mapService} = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userId, pickup, destination, vechileType } = req.body;
    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vechileType });
        res.status(201).json(ride);

        const pickupCoordinates = await mapService.getCoordinates(pickup);
        const captainsInRadius = await mapService.getCaptainsInRadius(pickupCoordinates.lat, pickupCoordinates.lng, 500); // 5 km radius

        ride.otp = ""

        const rideWithUser = await ride.populate('user', 'name email phone').execPopulate();

        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            });
        }) 

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