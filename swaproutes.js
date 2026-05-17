const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({

        success: true,
        message: "CORΛX Swap API Online"

    });

});

module.exports = router;
