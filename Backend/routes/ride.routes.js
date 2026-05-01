const express = require("express");
const router = express.Router();
const {body,query} = require("express-validator");
const rideController = require("../controllers/ride.controller");
const { authUser } = require("../middlewares/auth.middleware");

function normalizeVehicleType(req, res, next) {
    if (req.body.vehicleType && !req.body.vechileType) {
        req.body.vechileType = req.body.vehicleType;
    }
    next();
}

router.post("/create",
    authUser,
    normalizeVehicleType,
    body("pickup").isString().withMessage("pickup location is required"),
    body("destination").isString().withMessage("dropoff location is required"),
    body("vechileType")
        .isString().withMessage("vehicle type is required")
        .trim()
        .customSanitizer(type => String(type).toLowerCase())
        .isIn(["auto", "car", "motorcycle", "moto", "bike"]).withMessage("invalid vechile type"),
    rideController.createRide
);

router.get("/get-fare",
    authUser,
    query("pickup").isString().withMessage("pickup location is required"),
    query("destination").isString().withMessage("dropoff location is required"),
    rideController.getFare
)




module.exports = router;