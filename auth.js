const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("./userModel");

const router = express.Router();

// =========================================
// REGISTER
// =========================================

router.post("/register", async (req, res) => {

    try {

        const {

            username,
            email,
            password

        } = req.body;

        // VALIDATION

        if (
            !username ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,
                message: "All fields required"

            });

        }

        // CHECK USER

        const existingUser =
            await User.findOne({

                email

            });

        if (existingUser) {

            return res.status(400).json({

                success: false,
                message: "User already exists"

            });

        }

        // HASH PASSWORD

        const hashedPassword =
            await bcrypt.hash(password, 10);

        // CREATE USER

        const user = await User.create({

            username,
            email,
            password: hashedPassword

        });

        // TOKEN

        const token = jwt.sign(

            {

                id: user._id

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );

        // RESPONSE

        res.status(201).json({

            success: true,

            token,

            user: {

                id: user._id,

                username: user.username,

                email: user.email

            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server error"

        });

    }

});

// =========================================
// LOGIN
// =========================================

router.post("/login", async (req, res) => {

    try {

        const {

            email,
            password

        } = req.body;

        // CHECK USER

        const user = await User.findOne({

            email

        });

        if (!user) {

            return res.status(400).json({

                success: false,
                message: "Invalid credentials"

            });

        }

        // CHECK PASSWORD

        const validPassword =
            await bcrypt.compare(

                password,
                user.password

            );

        if (!validPassword) {

            return res.status(400).json({

                success: false,
                message: "Invalid credentials"

            });

        }

        // TOKEN

        const token = jwt.sign(

            {

                id: user._id

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );

        // RESPONSE

        res.status(200).json({

            success: true,

            token,

            user: {

                id: user._id,

                username: user.username,

                email: user.email

            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server error"

        });

    }

});

module.exports = router;
