// =========================================
// CORΛX WALLET ROUTES
// Wallet & Balance APIs
// =========================================

const express = require("express");

const User = require("./userModel");

const {

    verifyToken

} = require("./auth");

const router = express.Router();

// =========================================
// GET WALLET DATA
// =========================================

router.get(

    "/wallet",

    verifyToken,

    async (req, res) => {

        try {

            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {

                return res.status(404).json({

                    success: false,

                    message:
                        "User not found"

                });

            }

            return res.status(200).json({

                success: true,

                wallet: {

                    balance:
                        user.balance,

                    stakingBalance:
                        user.stakingBalance,

                    walletAddress:
                        user.walletAddress

                }

            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({

                success: false,

                message:
                    "Server error"

            });

        }

    }

);

// =========================================
// CONNECT WALLET
// =========================================

router.post(

    "/connect-wallet",

    verifyToken,

    async (req, res) => {

        try {

            const {

                walletAddress

            } = req.body;

            if (!walletAddress) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Wallet address required"

                });

            }

            const user =
                await User.findByIdAndUpdate(

                    req.user.id,

                    {

                        walletAddress

                    },

                    {

                        new: true

                    }

                );

            return res.status(200).json({

                success: true,

                message:
                    "Wallet connected",

                walletAddress:
                    user.walletAddress

            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({

                success: false,

                message:
                    "Server error"

            });

        }

    }

);

// =========================================
// EXPORT ROUTER
// =========================================

module.exports = router;
