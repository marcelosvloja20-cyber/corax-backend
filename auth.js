// =========================================
// CORΛX AUTH SYSTEM
// JWT Authentication
// =========================================

const jwt = require("jsonwebtoken");

// =========================================
// GENERATE TOKEN
// =========================================

function generateToken(user) {

    return jwt.sign(

        {
            id: user._id,
            email: user.email
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "7d"
        }

    );

}

// =========================================
// VERIFY TOKEN
// =========================================

function verifyToken(req, res, next) {

    try {

        const authHeader =
            req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({

                success: false,

                message:
                    "Access denied"

            });

        }

        const token =
            authHeader.split(" ")[1];

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({

            success: false,

            message:
                "Invalid token"

        });

    }

}

// =========================================
// EXPORTS
// =========================================

module.exports = {

    generateToken,
    verifyToken

};
