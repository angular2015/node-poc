const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true, // Ensures username is not empty
            len: {
                args: [3, 30], // Username length between 3 and 30 characters
                msg: "Username must be between 3 and 30 characters long."
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Must be a valid email address."
            },
            notEmpty: true // Ensures email is not empty
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, // Ensures password is not empty
            len: {
                args: [8, 100], // Password length between 8 and 100 characters
                msg: "Password must be between 8 and 100 characters long."
            }
            // ,
            // isAlphanumeric: {
            //     msg: "Password must contain letters and numbers."
            // }
        }
    }
});

module.exports = User;
