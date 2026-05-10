// =========================================
// CORΛX SERVER.JS
// Real Backend API
// =========================================

// =========================================
// IMPORTS
// =========================================

const express =
    require("express");

const sqlite3 =
    require("sqlite3").verbose();

const bcrypt =
    require("bcrypt");

const jwt =
    require("jsonwebtoken");

const cors =
    require("cors");

require("dotenv").config();

// =========================================
// APP
// =========================================

const app =
    express();

const PORT =
    process.env.PORT || 3000;

// =========================================
// MIDDLEWARE
// =========================================

app.use(cors());

app.use(express.json());

// =========================================
// DATABASE
// =========================================

const db =
    new sqlite3.Database(

        "./corax.db",

        err => {

            if(err){

                console.log(err);

            } else {

                console.log(
                    "CORΛX Database Connected 💾"
                );

            }

        }

    );

// =========================================
// CREATE TABLE
// =========================================

db.run(`

    CREATE TABLE IF NOT EXISTS users (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        email TEXT UNIQUE,

        password TEXT

    )

`);

// =========================================
// ROOT
// =========================================

app.get("/", (req,res) => {

    res.json({

        status:"online",

        project:"CORΛX",

        message:
        "Money Without Borders"

    });

});

// =========================================
// REGISTER
// =========================================

app.post("/register", async (req,res) => {

    try{

        const {

            email,
            password

        } = req.body;

        // ================================
        // VALIDATION
        // ================================

        if(

            !email
            ||
            !password

        ){

            return res.status(400).json({

                success:false,

                message:
                "Missing fields"

            });

        }

        // ================================
        // HASH
        // ================================

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        // ================================
        // INSERT
        // ================================

        db.run(

            `

            INSERT INTO users
            (email,password)

            VALUES (?,?)

            `,

            [

                email,
                hashedPassword

            ],

            function(err){

                if(err){

                    return res.status(400).json({

                        success:false,

                        message:
                        "User already exists"

                    });

                }

                return res.json({

                    success:true,

                    message:
                    "Account created"

                });

            }

        );

    } catch(error){

        console.log(error);

        return res.status(500).json({

            success:false,

            message:
            "Internal server error"

        });

    }

});

// =========================================
// LOGIN
// =========================================

app.post("/login", (req,res) => {

    const {

        email,
        password

    } = req.body;

    db.get(

        `

        SELECT *
        FROM users

        WHERE email = ?

        `,

        [email],

        async (err,user) => {

            if(err){

                return res.status(500).json({

                    message:
                    "Database error"

                });

            }

            if(!user){

                return res.status(404).json({

                    message:
                    "User not found"

                });

            }

            // ============================
            // PASSWORD
            // ============================

            const validPassword =
                await bcrypt.compare(

                    password,
                    user.password

                );

            if(!validPassword){

                return res.status(401).json({

                    message:
                    "Invalid password"

                });

            }

            // ============================
            // TOKEN
            // ============================

            const token =
                jwt.sign(

                    {

                        id:user.id,
                        email:user.email

                    },

                    process.env.JWT_SECRET
                    ||
                    "corax_secret_key",

                    {

                        expiresIn:"7d"

                    }

                );

            // ============================
            // RESPONSE
            // ============================

            return res.json({

                success:true,

                token,

                email:user.email

            });

        }

    );

});

// =========================================
// PROTECTED ROUTE
// =========================================

app.get(

    "/profile",

    authenticateToken,

    (req,res) => {

        res.json({

            success:true,

            user:req.user

        });

    }

);

// =========================================
// AUTH MIDDLEWARE
// =========================================

function authenticateToken(

    req,
    res,
    next

){

    const authHeader =
        req.headers["authorization"];

    const token =
        authHeader &&
        authHeader.split(" ")[1];

    if(!token){

        return res.status(401).json({

            message:
            "Access denied"

        });

    }

    jwt.verify(

        token,

        process.env.JWT_SECRET
        ||
        "corax_secret_key",

        (err,user) => {

            if(err){

                return res.status(403).json({

                    message:
                    "Invalid token"

                });

            }

            req.user = user;

            next();

        }

    );

}

// =========================================
// START SERVER
// =========================================

app.listen(PORT, () => {

    console.log(

        `CORΛX API Running On Port ${PORT} 🚀`

    );

});
