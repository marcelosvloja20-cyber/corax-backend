const express = require("express");

const cors = require("cors");

require("dotenv").config();

const connectDatabase = require("./database");

// ROUTES

const authRoutes = require("./auth");

const walletRoutes = require("./walletroutes");

const swapRoutes = require("./swaproutes");

const stakingRoutes = require("./stakingroutes");

const bridgeRoutes = require("./bridgeroutes");

// APP

const app = express();

// MIDDLEWARE

app.use(cors());

app.use(express.json());

// DATABASE

connectDatabase();

// ROUTES

app.use("/api/auth", authRoutes);

app.use("/api/wallet", walletRoutes);

app.use("/api/swap", swapRoutes);

app.use("/api/staking", stakingRoutes);

app.use("/api/bridge", bridgeRoutes);

// ROOT

app.get("/", (req, res) => {

    res.json({

        success: true,

        project: "CORΛX",

        status: "ONLINE",

        message: "Money Without Borders"

    });

});

// HEALTH

app.get("/health", (req, res) => {

    res.json({

        status: "OK"

    });

});

// PORT

const PORT = process.env.PORT || 10000;

// START SERVER

app.listen(PORT, () => {

    console.log(

        `CORΛX running on port ${PORT}`

    );

}); 
