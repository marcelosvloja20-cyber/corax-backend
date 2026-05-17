const mongoose = require("mongoose");

const connectDatabase = async () => {

    try {

        await mongoose.connect(

            process.env.MONGO_URI || 
            "mongodb://localhost:27017/corax"

        );

        console.log("CORΛX Database Connected");

    }

    catch (error) {

        console.log(

            "Database Error:",
            error.message

        );

    }

};

module.exports = connectDatabase;
