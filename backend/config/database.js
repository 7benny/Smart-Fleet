const { Sequelize } = require('sequelize'); //Importing the sequezlize class from sequelize library

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // SQLite database file
    logging: false, // Disable logging; set to console.log to see SQL queries
  });
  
module.exports = sequelize;


