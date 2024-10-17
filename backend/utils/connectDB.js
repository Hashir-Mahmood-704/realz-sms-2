const mongoose = require('mongoose');

async function connectDataBase() {
    const connectionURL = process.env.MONGO_DB_URL;
    if (!connectionURL) throw new Error('Mongo_DB connection URL not found');
    await mongoose.connect(connectionURL);
}

module.exports = { connectDataBase };