const jwt = require("jsonwebtoken");

// =========================================
// VERIFY TOKEN
// =========================================

const verifyToken = (

  req,
  res,
  next

) => {

  try {

    const authHeader =
      req.headers.authorization;

    // CHECK TOKEN

    if (!authHeader) {

      return res.status(401).json({

        success: false,

        message: "No token provided"

      });

    }

    // REMOVE BEARER

    const token =
      authHeader.split(" ")[1];

    // VERIFY

    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET

      );

    // SAVE USER

    req.user = decoded;

    next();

  }

  catch (error) {

    return res.status(401).json({

      success: false,

      message: "Invalid token"

    });

  }

};

module.exports = verifyToken;
