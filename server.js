const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const mongoose = require("mongoose");

// =========================================
// ENV CONFIG
// =========================================

dotenv.config();

// =========================================
// IMPORT ROUTES
// =========================================

const authRoutes = require("./auth");

const walletRoutes = require("./walletroutes");

const swapRoutes = require("./swaproutes");

const stakingRoutes = require("./stakingroutes");

const bridgeRoutes = require("./bridgeroutes");

const userRoutes = require("./userRoutes");

// =========================================
// EXPRESS APP
// =========================================

const app = express();

// =========================================
// MIDDLEWARES
// =========================================

app.use(cors());

app.use(express.json());

// =========================================
// DATABASE CONNECTION
// =========================================

mongoose.connect(

    process.env.MONGO_URI,

    {}

)

.then(() => {

    console.log("MongoDB Connected");

})

.catch((error) => {

    console.log(

        "MongoDB Connection Error:",

        error.message

    );

});

// =========================================
// API ROUTES
// =========================================

app.use("/api/auth", authRoutes);

app.use("/api/wallet", walletRoutes);

app.use("/api/swap", swapRoutes);

app.use("/api/staking", stakingRoutes);

app.use("/api/bridge", bridgeRoutes);

app.use("/api/user", userRoutes);

// =========================================
// ROOT ROUTE
// =========================================

app.get("/", (req, res) => {

    res.json({

        success: true,

        project: "CORΛX",

        status: "ONLINE",

        message: "Money Without Borders"

    });

});

// =========================================
// HEALTH CHECK
// =========================================

app.get("/health", (req, res) => {

    res.status(200).json({

        success: true,

        status: "OK"

    });

});

// =========================================
// SERVER CONFIG
// =========================================

const PORT = process.env.PORT || 10000;

// =========================================
// START SERVER
// =========================================

app.listen(PORT, () => {

    console.log(

        `CORΛX running on port ${PORT}`

    );

});
