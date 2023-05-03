const {User} = require('../models');

const userData = [
    {
        username: 'codeLover20',
        password: 'kjkjk6'
    },
    {
        username: 'codeDude20',
        password: 'kjkjk7'
    },
];

const seedUser = () => User.bulkCreate(userData);
module.exports = seedUser;