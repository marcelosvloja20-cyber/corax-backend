require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

// =====================================
// ROUTES
// =====================================

const authRoutes = require("./auth");

const userRoutes = require("./userroutes");

const walletRoutes = require("./walletRoutes");

// =====================================

const app = express();

// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());

app.use(express.json());

// =====================================
// DATABASE
// =====================================

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("MongoDB connected");

})

.catch((error) => {

  console.log(error);

});

// =====================================
// ROUTES
// =====================================

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/wallet", walletRoutes);

// =====================================
// HOME
// =====================================

app.get("/", (req, res) => {

  res.json({

    success: true,

    message: "CORΛX API Running"

  });

});

// =====================================
// SERVER
// =====================================

const PORT =
  process.env.PORT || 10000;

app.listen(PORT, () => {

  console.log(

    `CORΛX running on port ${PORT}`

  );

});
