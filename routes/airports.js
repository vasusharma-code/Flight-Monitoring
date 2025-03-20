const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all airports
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Airports");
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Add a new airport
router.post("/", async (req, res) => {
    try {
        const { name, iata_code, icao_code, country, city, latitude, longitude } = req.body;
        const sql = "INSERT INTO Airports (name, iata_code, icao_code, country, city, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)";
        await pool.query(sql, [name, iata_code, icao_code, country, city, latitude, longitude]);
        res.status(201).json({ message: "Airport added successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
