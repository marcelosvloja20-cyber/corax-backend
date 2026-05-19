const express = require("express");

const router = express.Router();

// =========================================
// REGISTER
// =========================================

router.post("/register", async (req, res) => {

    res.status(200).json({

        success: true,

        message: "Register route online"

    });

});

// =========================================
// LOGIN
// =========================================

router.post("/login", async (req, res) => {

    res.status(200).json({

        success: true,

        message: "Login route online"

    });

});

// =========================================
// EXPORT
// =========================================

module.exports = router;
