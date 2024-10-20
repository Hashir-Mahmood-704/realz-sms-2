const mongoose = require('mongoose');

async function connectDataBase() {
    const connectionURL ='mongodb+srv://hashir704x:mongo123@cluster0.hr4mv.mongodb.net/users';
    if (!connectionURL) throw new Error('Mongo_DB connection URL not found');
    await mongoose.connect(connectionURL);
}

module.exports = { connectDataBase };

//process.env.MONGO_DB_URL; 