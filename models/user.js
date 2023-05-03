const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connections/config');
const bcrypt = require('bcrypt');

class User extends Model {
    async checkPassword(loginPw) {
      return await bcrypt.compare(loginPw, this.password);
    }
  }
  
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5],
          isAlphanumeric: true
        },
      },
    },
    {
      hooks: {
        async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        beforeUpdate: async (updateUser) => {
          if(updateUser.password) {
            updateUser.password = await bcrypt.hash(req.body.password, 10);
          }
          return updateUser;
        
      }
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
    }
  );
  
  module.exports = User;
  