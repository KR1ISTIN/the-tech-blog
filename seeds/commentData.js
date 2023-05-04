const {Comments} = require('../models');

const commentData = [
    {
      use_id: 1,
      blog_id: 1,
      comment: 'Wow! Interesting.'
    },
    {
      use_id: 2,
      blog_id: 2,
      comment: 'Would have not thought of this.'
    },
];

const seedComment = () => Comments.bulkCreate(commentData);
module.exports = seedComment;