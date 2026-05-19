const verifyToken = (req, res, next) => {

    try {

        next();

    }

    catch (error) {

        return res.status(401).json({

            success: false,

            message: "Authentication error"

        });

    }

};

module.exports = verifyToken;
