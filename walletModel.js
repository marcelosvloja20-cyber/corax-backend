const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    walletAddress: {

        type: String,

        required: true

    },

    network: {

        type: String,

        default: "Ethereum"

    },

    balance: {

        type: Number,

        default: 0

    },

    createdAt: {

        type: Date,

        default: Date.now

    }

});

module.exports = mongoose.model(

    "Wallet",

    walletSchema

);
