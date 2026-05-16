// =========================================
// CORΛX USER MODEL
// MongoDB User Schema
// =========================================

const mongoose = require("mongoose");

// =========================================
// USER SCHEMA
// =========================================

const userSchema = new mongoose.Schema(

    {

        username: {

            type: String,

            required: true,

            trim: true

        },

        email: {

            type: String,

            required: true,

            unique: true,

            lowercase: true

        },

        password: {

            type: String,

            required: true

        },

        walletAddress: {

            type: String,

            default: null

        },

        balance: {

            type: Number,

            default: 0

        },

        stakingBalance: {

            type: Number,

            default: 0

        },

        role: {

            type: String,

            enum: [

                "user",
                "admin",
                "institution"

            ],

            default: "user"

        },

        verified: {

            type: Boolean,

            default: false

        },

        createdAt: {

            type: Date,

            default: Date.now

        }

    },

    {

        versionKey: false

    }

);

// =========================================
// EXPORT MODEL
// =========================================

module.exports = mongoose.model(
    "User",
    userSchema
);
