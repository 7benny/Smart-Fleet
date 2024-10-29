const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const sequelize = require('./config/database')

//Initializing the server
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//Basic route
app.get('/', (req,res) => {
    res.send('Hello, Fleet Management backend');
});

//Defining the port 
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();