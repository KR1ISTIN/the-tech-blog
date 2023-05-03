const {Comments} = require('../models');

const commentData = [
    {
      use_id: 1,
      blog_id: 1,
      comment: 'this is my comment'
    },
    {
      use_id: 2,
      blog_id: 2,
      comment: 'im ready for vacay'
    },
];

const seedComment = () => Comments.bulkCreate(commentData);
module.exports = seedComment;