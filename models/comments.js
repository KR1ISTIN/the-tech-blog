const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connections/config');
const User = require('./user')


class Comments extends Model {}

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    use_id: {
      type: DataTypes.INTEGER, // user table ID
      allowNull: false,
      //defaultValue: 1,
      references: {
        model: 'user',
        key: 'id'
      },
    },
    blog_id: {
      type: DataTypes.INTEGER, // user table ID
      allowNull: false,
      //defaultValue: 1,
      references: {
        model: 'blog',
        key: 'id'
      },
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comments;