const {Blog} = require('../models');

const blogData = [
    {
      date: '2020-12-03',
      title: 'The Life of JavaScript',
      post: 'This is a post about coding in Javascript and the daily life of writing code.',
      author: 1
    },
    {
      date: '2023-06-02',
      title: "Today's Modern Coding",
      post: 'A blog about the use of new technologies.',
      author: 2
    }, 
];

const seedBlog = () => Blog.bulkCreate(blogData);
module.exports = seedBlog;