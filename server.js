// =========================================
// CORΛX MAIN SERVER
// Backend Infrastructure
// =========================================

require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDatabase =
    require("./database");

// =========================================
// ROUTES
// =========================================

const authRoutes =
    require("./authRoutes");

const walletRoutes =
    require("./walletRoutes");

const stakingRoutes =
    require("./stakingRoutes");

const swapRoutes =
    require("./swapRoutes");

const bridgeRoutes =
    require("./bridgeRoutes");

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
// DATABASE
// =========================================

connectDatabase();

// =========================================
// API ROUTES
// =========================================

app.use("/api/auth", authRoutes);

app.use("/api/wallet", walletRoutes);

app.use("/api/staking", stakingRoutes);

app.use("/api/swap", swapRoutes);

app.use("/api/bridge", bridgeRoutes);

// =========================================
// ROOT
// =========================================

app.get("/", (req, res) => {

    res.json({

        success: true,

        message:
            "🟣 CORΛX Backend Online"

    });

});

// =========================================
// HEALTH CHECK
// =========================================

app.get("/health", (req, res) => {

    res.status(200).json({

        status: "OK",

        uptime: process.uptime()

    });

});

// =========================================
// PORT
// =========================================

const PORT =
    process.env.PORT || 10000;

// =========================================
// START SERVER
// =========================================

app.listen(PORT, () => {

    console.log(

        `🚀 CORΛX Server Running on Port ${PORT}`

    );

});
