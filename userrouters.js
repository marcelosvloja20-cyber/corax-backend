const express = require("express");

const verifyToken = require("./middleware");

const User = require("./userModel");

const router = express.Router();

// =========================================
// GET CURRENT USER
// =========================================

router.get(

    "/me",

    verifyToken,

    async (req, res) => {

        try {

            const user = await User.findById(

                req.user.id

            ).select("-password");

            if (!user) {

                return res.status(404).json({

                    success: false,
                    message: "User not found"

                });

            }

            res.status(200).json({

                success: true,
                user

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
