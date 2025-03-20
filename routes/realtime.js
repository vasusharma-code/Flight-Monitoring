const express = require("express");
const axios = require("axios");
const pool = require("../db"); // MySQL connection

const router = express.Router();

// Fetch real-time flight data from OpenSky API
router.get("/flights", async (req, res) => {
    try {
        const response = await axios.get("https://opensky-network.org/api/states/all");

        // Check if response data exists
        if (!response.data || !response.data.states) {
            return res.status(500).json({ message: "No flight data available" });
        }

        // Map flight data to match table structure
        const flights = response.data.states.map(state => ({
            flight_number: state[1] ? state[1].trim() : "UNKNOWN",
            airline_id: null, // Set this to actual airline ID if available
            departure_airport_id: null, // Set this based on flight data
            arrival_airport_id: null, // Set this based on flight data
            scheduled_departure: new Date(), // Replace with real data
            actual_departure: null, // Replace with real data
            scheduled_arrival: new Date(), // Replace with real data
            actual_arrival: null, // Replace with real data
            status: "on-time", // Default to on-time; update dynamically
            delay_duration: 0 // Default delay duration
        }));

        res.json({ flights });
    } catch (error) {
        console.error("❌ Error fetching real-time flight data:", error);
        res.status(500).json({ message: "Error fetching flight data" });
    }
});
// Store real-time flights into MySQL
router.post("/store", async (req, res) => {
    try {
        const flights = req.body.flights;

        if (!flights || flights.length === 0) {
            return res.status(400).json({ message: "No flights provided" });
        }

        console.log("🔹 Received flights:", flights.length);

        const sql = `
            INSERT INTO flights (icao24, flight_number, airline_id, departure_airport_id, arrival_airport_id, scheduled_departure, actual_departure, scheduled_arrival, actual_arrival, status, delay_duration) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await Promise.all(
            flights.map(flight =>
                pool.query(sql, [
                    flight.icao24 || "UNKNOWN", // Ensure icao24 is never NULL
                    flight.flight_number || "N/A",
                    flight.airline_id || null,
                    flight.departure_airport_id || null,
                    flight.arrival_airport_id || null,
                    flight.scheduled_departure || new Date(),
                    flight.actual_departure || null,
                    flight.scheduled_arrival || new Date(),
                    flight.actual_arrival || null,
                    flight.status || "on-time",
                    flight.delay_duration || 0
                ])
            )
        );

        res.json({ message: "✅ Flights stored successfully" });
    } catch (error) {
        console.error("❌ Error storing flight data:", error);
        res.status(500).json({ message: "Database error" });
    }
});

module.exports = router;
