const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all delayed flights
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Flight_Delays");
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Update claim status
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { claim_status } = req.body;
        const sql = "UPDATE Flight_Delays SET claim_status = ? WHERE id = ?";
        await pool.query(sql, [claim_status, id]);
        res.json({ message: "Claim status updated" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
