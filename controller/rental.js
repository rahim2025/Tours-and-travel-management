// controller/rental.js
const ExpressError = require("../utilis/expressError.js");
const vehicles = require("../init/vehicles.js");

module.exports.rentForm = (req, res) => {
    res.render("rentals/rentForm.ejs");
};

module.exports.vehicleOptions = (req, res) => {
    const { district, differentOrigin, originDistrict, places, passengers, days, vehicleType } = req.body;

    try  {
        // Split the places string into an array and get the count
        const placesCount = places.split(',').length;

        // Filter vehicles based on the form inputs
        const filteredVehicles = vehicles.filter(vehicle => {
            // Check if the vehicle matches the type and passenger requirements
            if (vehicle.type !== vehicleType || vehicle.maxPassengers < passengers) {
                return false;
            }

            // If traveling from a different district, check origin and destination districts
            if (differentOrigin) {
                return vehicle.originDistrict === originDistrict && vehicle.destinationDistrict.includes(district);
            }

            // If not traveling from a different district, check if the vehicle serves the destination district
            return vehicle.originDistrict === district;
        }).map(vehicle => {
            // Calculate the total cost
            let totalCost = vehicle.intraCost * placesCount * days;
            if (differentOrigin && vehicle.interDistrict) {
                totalCost += vehicle.interCost * 2;
            }
            return { ...vehicle, totalCost };
        });
        req.session.totalCost = filteredVehicles.reduce((acc, vehicle) => acc + vehicle.totalCost, 0);
        req.session.percentage = filteredVehicles.reduce((acc, vehicle) => acc + vehicle.percentage, 0) / filteredVehicles.length;
        res.render("rentals/options.ejs", { vehicles: filteredVehicles });
    } catch (err) {
        throw new ExpressError(500, "Error Occurred");
    }
};

