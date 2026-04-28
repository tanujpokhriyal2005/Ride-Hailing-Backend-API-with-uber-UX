const rideModel = require("../models/ride.model");
const mapsService = require("../services/maps.service");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


async function getFare(pickup, destination) {
    if(!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }
    const distanceTime = await mapsService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };



    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + ((distanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((distanceTime.duration.value / 60) * perMinuteRate.motorcycle))
    };
    return fare;
}


function getOTP(num){
    function generateOTP(num){
        const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
        return otp;
    }
    return generateOTP(num);
}


module.exports.createRide = async ({ user, pickup, destination, vechileType }) => {
    if(!user || !pickup || !destination || !vechileType) {
        throw new Error("All fields are required");
    }
    const normalizedType = String(vechileType).trim().toLowerCase();
    const normalizedVehicleType = ["moto", "bike", "motorbike"].includes(normalizedType)
        ? "motorcycle"
        : normalizedType;
    const fareRates = await getFare(pickup, destination);
    if (!fareRates[normalizedVehicleType]) {
        throw new Error("Invalid vehicle type");
    }
    const fareValue = fareRates[normalizedVehicleType];
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOTP(4),
        fare: fareValue
    });
    return ride;
}

