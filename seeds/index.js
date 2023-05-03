const sequelize = require('../connections/config');
const seedBlog = require('./blogData');
const seedUser = require('./userData');
const seedComment = require('./commentData');

const seedFiles = async () => {

    await sequelize.sync({force:true});

    await seedUser();
    console.log('user seeded');

    await seedBlog();
    console.log('blog seeded');
    
    await seedComment();
    console.log('comments seeded');

    process.exit(0);
};

seedFiles();