const mongoose = require('mongoose');
module.exports = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/bus-ticket', {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        console.log("Database connected");
    }
    catch (err) {
        console.log("Database error")
        throw err;

    }

    // const db = mongoose.connection;
    // db.on("error", console.error.bind(console, "connection error:"));
    // db.once("open", () => {
    //     console.log("Database connected");
    // });

}