const {Blog} = require('../models');

const blogData = [
    {
      date: '2020-12-03',
      title: 'Title one',
      post: 'Post One about Code',
      author: 1
    },
    {
      date: '2023-06-02',
      title: 'Title two',
      post: 'Post Two about Travel',
      author: 2
    }, 
];

const seedBlog = () => Blog.bulkCreate(blogData);
module.exports = seedBlog;