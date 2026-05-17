const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({

        message: "CORΛX Wallet Route Online"

    });

});

module.exports = router;
