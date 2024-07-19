const {DataTypes} = require('sequelize');
const sequelize = require('../helpers/db');

const Account = sequelize.define('Account', {
    account_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    account_holder: {
        type: DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    }
})

module.exports= Account