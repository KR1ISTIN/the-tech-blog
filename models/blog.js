const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connections/config');
const User = require('./user')


class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    author: {
      type: DataTypes.INTEGER, //the user table id will below to authorID
      allowNull: true,
      references: {
        model: 'user',
        key:'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    modelName: 'blog',
  }
);

module.exports = Blog;