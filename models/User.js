// models/User.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

module.exports = User;
