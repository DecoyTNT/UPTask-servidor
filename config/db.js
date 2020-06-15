const Sequelize = require('sequelize');
require('dotenv').config({ path: 'variables.env' });

// Option 1: Passing parameters separately
const db = new Sequelize('uptask', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    operatorsAliases: '0',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;
