const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const airportRoutes = require("./routes/airports");
const flightRoutes = require("./routes/flights");
const delayRoutes = require("./routes/delays");
const realtimeRoutes = require("./routes/realtime");

// Use routes
app.use("/api/airports", airportRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/delays", delayRoutes);
app.use("/api/realtime", realtimeRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
