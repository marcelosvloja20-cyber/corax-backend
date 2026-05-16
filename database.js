// =========================================
// CORΛX DATABASE CONFIG
// PostgreSQL / Mongo Ready
// =========================================

require("dotenv").config();

const mongoose = require("mongoose");

// =========================================
// CONNECT DATABASE
// =========================================

async function connectDatabase() {

    try {

        await mongoose.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        console.log(
            "🟣 CORΛX Database Connected"
        );

    } catch (error) {

        console.error(
            "❌ Database Connection Error:",
            error.message
        );

        process.exit(1);

    }

}

// =========================================
// EXPORT
// =========================================

module.exports = connectDatabase;
