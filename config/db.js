const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('codePoc', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
