const User = require('./user');
const Blog = require('./blog');
const Comments = require('./comments');
const { use } = require('../controllers/api/user');

//DONT THINK I NEED THESE 
// Blog.belongsTo(User, { 
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE',
//   });
// Comments.belongsTo(User, { 
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE',
//   });

  Blog.hasMany(Comments, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
  });

  Comments.belongsTo(Blog, {
    foreignKey: "blog_id",
  });

  Blog.belongsTo(User, {
    foreignKey: 'author'
  });

  User.hasMany(Blog, {
    foreignKey: "author",
    onDelete: "CASCADE",
  });

  Comments.belongsTo(User, {
    foreignKey: "use_id"
  })

  User.hasMany(Comments, {
    foreignKey: "use_id",
    onDelete: "CASCADE"
  })



module.exports = { User, Blog, Comments};