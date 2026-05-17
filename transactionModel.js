// =========================================
// CORΛX TRANSACTION MODEL
// Transaction History Schema
// =========================================

const mongoose = require("mongoose");

// =========================================
// TRANSACTION SCHEMA
// =========================================

const transactionSchema = new mongoose.Schema(

    {

        userId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        type: {

            type: String,

            enum: [

                "deposit",
                "withdraw",
                "swap",
                "bridge",
                "stake",
                "unstake"

            ],

            required: true

        },

        token: {

            type: String,

            required: true

        },

        amount: {

            type: Number,

            required: true

        },

        status: {

            type: String,

            enum: [

                "pending",
                "completed",
                "failed"

            ],

            default: "completed"

        },

        txHash: {

            type: String,

            default: null

        },

        network: {

            type: String,

            default: "CORΛX"

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

    "Transaction",

    transactionSchema

);
