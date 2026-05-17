// =========================================
// CORΛX BACKEND SERVER
// Money Without Borders
// =========================================

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// =========================================
// ROUTES
// =========================================

const authRoutes = require("./auth");
const walletRoutes = require("./walletroutes");
const swapRoutes = require("./swaproutes");
const stakingRoutes = require("./stakingroutes");
const bridgeRoutes = require("./bridgeroutes");

// =========================================
// APP CONFIG
// =========================================

const app = express();

app.use(cors());

app.use(express.json());

// =========================================
// DATABASE CONNECTION
// =========================================

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected");

})

.catch((error) => {

    console.log("MongoDB Error:", error);

});

// =========================================
// API ROUTES
// =========================================

app.use("/api/auth", authRoutes);

app.use("/api/wallet", walletRoutes);

app.use("/api/swap", swapRoutes);

app.use("/api/staking", stakingRoutes);

app.use("/api/bridge", bridgeRoutes);

// =========================================
// ROOT ROUTE
// =========================================

app.get("/", (req, res) => {

    res.json({

        project: "CORΛX Backend",

        status: "ONLINE",

        message: "Money Without Borders"

    });

});

// =========================================
// SERVER START
// =========================================

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {

    console.log(`CORΛX Server running on port ${PORT}`);

});
