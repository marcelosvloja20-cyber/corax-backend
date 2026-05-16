// =========================================
// CORΛX STAKING ROUTES
// Staking APIs
// =========================================

const express = require("express");

const User = require("./userModel");

const {

    verifyToken

} = require("./auth");

const router = express.Router();

// =========================================
// STAKE TOKENS
// =========================================

router.post(

    "/stake",

    verifyToken,

    async (req, res) => {

        try {

            const {

                amount

            } = req.body;

            if (!amount || amount <= 0) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid amount"

                });

            }

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

            // CHECK BALANCE

            if (user.balance < amount) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Insufficient balance"

                });

            }

            // UPDATE BALANCES

            user.balance -= amount;

            user.stakingBalance += amount;

            await user.save();

            return res.status(200).json({

                success: true,

                message:
                    "Tokens staked successfully",

                balance:
                    user.balance,

                stakingBalance:
                    user.stakingBalance

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
// UNSTAKE TOKENS
// =========================================

router.post(

    "/unstake",

    verifyToken,

    async (req, res) => {

        try {

            const {

                amount

            } = req.body;

            if (!amount || amount <= 0) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid amount"

                });

            }

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

            // CHECK STAKING

            if (
                user.stakingBalance < amount
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Insufficient staking balance"

                });

            }

            // UPDATE BALANCES

            user.stakingBalance -= amount;

            user.balance += amount;

            await user.save();

            return res.status(200).json({

                success: true,

                message:
                    "Tokens unstaked successfully",

                balance:
                    user.balance,

                stakingBalance:
                    user.stakingBalance

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
