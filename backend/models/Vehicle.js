// models/Vehicle.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Import User model to establish relationship

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  make: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1900,
      max: new Date().getFullYear() + 1,
    },
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'maintenance'),
    defaultValue: 'active',
  },
  batteryLevel: {
    type: DataTypes.FLOAT,
    defaultValue: 100.0,
    validate: {
      min: 0,
      max: 100,
    },
  },
  location: {
    type: DataTypes.JSON, // { latitude: Number, longitude: Number }
    allowNull: true,
  },
});

// Define relationships
User.hasMany(Vehicle, { foreignKey: 'ownerId' });
Vehicle.belongsTo(User, { foreignKey: 'ownerId' });

module.exports = Vehicle;
