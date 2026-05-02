const axios = require('axios');
const dotenv = require('dotenv');
const { listIndexes } = require('../models/user.model');
dotenv.config();
const captainModel = require('../models/captain.model');

module.exports.getCoordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const row = response.data.rows?.[0];
            const element = row?.elements?.[0];
            if (!element || element.status === 'ZERO_RESULTS') {
                throw new Error('No route found between the specified origin and destination');
            }
            if (!element.distance || !element.duration) {
                throw new Error('Distance or duration data missing from maps response');
            }
            return {
                distance: element.distance,
                duration: element.duration
            };
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    }
    catch(error){
        console.error(error);
        throw error;
    }
};

module.exports.getSuggestions = async (input) => {
    if(!input) {
        throw new Error('Query is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    }
    catch(error){
        console.error(error);
        throw error;
    }
};

module.exports.getCaptainsInRadius = async (ltd, lng, radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {    //mongodb geospatial query to find captains within a certain radius
                $centerSphere: [[lng, ltd], radius / 6378.1] // radius in radians
            }
        }
    });
    return captains;
}

