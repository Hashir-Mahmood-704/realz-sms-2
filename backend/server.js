const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutesHandler = require('./routes/userRoutes');
const twilioRoutesHandler = require('./routes/twilioRoutes');
const { connectDataBase } = require('./utils/connectDB');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config();
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', userRoutesHandler);
app.use('/api/twilio', twilioRoutesHandler);

connectDataBase()
    .then(() => {
        console.log('Database connected!');
        app.listen(3000, () => {
            console.log(`Server is running on port: 3000 `);
        });
    })
    .catch((error) => {
        console.error('Error in connecting database!');
        if (error instanceof Error) console.error(error.message);
        else console.error(error);
    });
  //process.env.PORT
  //${process.env.PORT}