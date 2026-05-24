const express = require("express");

const verifyToken = require("./middleware");

const Wallet = require("./walletModel");

const router = express.Router();

// =========================================
// CREATE WALLET
// =========================================

router.post(

  "/create",

  verifyToken,

  async (req, res) => {

    try {

      const {

        walletAddress,
        network

      } = req.body;

      // VALIDATION

      if (!walletAddress) {

        return res.status(400).json({

          success: false,

          message: "Wallet address required"

        });

      }

      // CREATE

      const wallet =
        await Wallet.create({

          userId: req.user.id,

          walletAddress,

          network

        });

      // RESPONSE

      res.status(201).json({

        success: true,

        wallet

      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: "Server error"

      });

    }

  }

);

// =========================================
// GET USER WALLETS
// =========================================

router.get(

  "/my-wallets",

  verifyToken,

  async (req, res) => {

    try {

      const wallets =
        await Wallet.find({

          userId: req.user.id

        });

      res.status(200).json({

        success: true,

        wallets

      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: "Server error"

      });

    }

  }

);

module.exports = router;
