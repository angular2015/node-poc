const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./users');

// Define Item model
const Item = sequelize.define('Item', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, // Ensure name is not empty
            len: {
                args: [1, 100], // Name length between 1 and 100 characters
                msg: "Name must be between 1 and 100 characters long."
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), // Price with two decimal points
        allowNull: false,
        validate: {
            isDecimal: true, // Ensure it is a valid decimal
            min: {
                args: [0],
                msg: "Price must be a positive value."
            }
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true, // Ensure it is an integer
            min: {
                args: [0],
                msg: "Quantity must be zero or greater."
            }
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, // Ensure category is not empty
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

// Associate Item with User
Item.belongsTo(User, { foreignKey: 'userId' });

module.exports = Item;
