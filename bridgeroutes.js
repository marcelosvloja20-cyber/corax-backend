// =========================================
// CORΛX BRIDGE ROUTES
// Cross-Chain Bridge APIs
// =========================================

const express = require("express");

const {

    verifyToken

} = require("./auth");

const router = express.Router();

// =========================================
// SUPPORTED NETWORKS
// =========================================

const supportedNetworks = [

    "Ethereum",
    "Polygon",
    "Solana",
    "Base",
    "BNB Chain"

];

// =========================================
// BRIDGE ASSET
// =========================================

router.post(

    "/bridge",

    verifyToken,

    async (req, res) => {

        try {

            const {

                fromNetwork,
                toNetwork,
                token,
                amount

            } = req.body;

            // VALIDATION

            if (
                !fromNetwork ||
                !toNetwork ||
                !token ||
                !amount
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Missing bridge fields"

                });

            }

            // NETWORK CHECK

            if (
                !supportedNetworks.includes(
                    fromNetwork
                ) ||

                !supportedNetworks.includes(
                    toNetwork
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Unsupported network"

                });

            }

            // MOCK TX HASH

            const txHash =

                "0x" +

                Math.random()
                    .toString(16)
                    .substring(2, 18)

                +

                Date.now()
                    .toString(16);

            // ESTIMATION

            const estimatedTime =
                "~45 seconds";

            const fee =
                (amount * 0.003).toFixed(4);

            return res.status(200).json({

                success: true,

                bridge: {

                    fromNetwork,

                    toNetwork,

                    token,

                    amount,

                    fee,

                    estimatedTime,

                    txHash,

                    status:
                        "PROCESSING"

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
// GET NETWORKS
// =========================================

router.get(

    "/networks",

    async (req, res) => {

        return res.status(200).json({

            success: true,

            networks:
                supportedNetworks

        });

    }

);

// =========================================
// EXPORT ROUTER
// =========================================

module.exports = router;
