const mongo = require("../db/mongo")

module.exports = async (req, res) => {
    try {
        await mongo()
        return res.status(200).send("Connected Succesfully")
    }

    catch {
        return res.status(500).send("Server Error")
    }
}