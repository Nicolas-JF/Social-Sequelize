// models/Like.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

class Like extends Model {}

Like.init(
  {
    reactionType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Like',
  }
);

module.exports = Like;
