const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI; //to hide password details


//mongoose.connect(URI);

const connectdb = async () =>{
    try {
        await mongoose.connect(URI);
        console.log("Connection successful to database");
    } catch (error) {
        console.log("database connection failed");
        process.exit(0);
    }
};
module.exports = connectdb;

