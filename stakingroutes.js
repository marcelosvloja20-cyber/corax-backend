const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({

        success: true,
        message: "CORΛX Staking API Online"

    });

});

module.exports = router;
