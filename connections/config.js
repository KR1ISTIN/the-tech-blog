const Sequelize = require('sequelize');
//require('dotenv').config();

const sequelize = new Sequelize(
    'blog_db',
    'root',
    '',
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }     
);

module.exports = sequelize;