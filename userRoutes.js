const express = require("express");

const router = express.Router();

// =========================================
// GET USER PROFILE
// =========================================

router.get("/me", async (req, res) => {

    res.status(200).json({

        success: true,

        user: {

            username: "CORΛX User",

            email: "user@corax.io",

            balance: 0,

            stakingBalance: 0

        }

    });

});

// =========================================
// EXPORT
// =========================================

module.exports = router;
