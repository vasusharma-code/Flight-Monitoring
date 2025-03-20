const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all flights
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Flights");
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get flights from a specific airport
router.get("/:airportId", async (req, res) => {
    try {
        const { airportId } = req.params;
        const [rows] = await pool.query("SELECT * FROM Flights WHERE departure_airport_id = ?", [airportId]);
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get flights delayed by more than 2 hours
router.get("/delayed", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Flights WHERE delay_duration > 120");
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
