// models/Profile.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

class Profile extends Model {}

Profile.init(
  {
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Profile',
  }
);

module.exports = Profile;
