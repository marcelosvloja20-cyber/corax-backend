// =========================================
// CORΛX SWAP ROUTES
// Token Swap APIs
// =========================================

const express = require("express");

const {

    verifyToken

} = require("./auth");

const router = express.Router();

// =========================================
// MOCK MARKET PRICES
// =========================================

const marketPrices = {

    BTC: 108420,

    ETH: 6820,

    SOL: 420,

    CRX: 12.84,

    USDC: 1

};

// =========================================
// SWAP TOKENS
// =========================================

router.post(

    "/swap",

    verifyToken,

    async (req, res) => {

        try {

            const {

                fromToken,
                toToken,
                amount

            } = req.body;

            // VALIDATION

            if (
                !fromToken ||
                !toToken ||
                !amount
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Missing fields"

                });

            }

            // CHECK TOKENS

            if (
                !marketPrices[fromToken] ||
                !marketPrices[toToken]
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Unsupported token"

                });

            }

            // CALCULATE

            const usdValue =
                amount *
                marketPrices[fromToken];

            const received =
                usdValue /
                marketPrices[toToken];

            return res.status(200).json({

                success: true,

                fromToken,

                toToken,

                amount,

                received,

                exchangeRate:

                    marketPrices[fromToken] /
                    marketPrices[toToken]

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
// MARKET DATA
// =========================================

router.get(

    "/markets",

    async (req, res) => {

        return res.status(200).json({

            success: true,

            prices: marketPrices

        });

    }

);

// =========================================
// EXPORT ROUTER
// =========================================

module.exports = router;
