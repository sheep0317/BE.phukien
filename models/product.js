const Sequelize = require('sequelize');
const db = require('../config/database');

const product = db.define('product', {
    product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    
    },
    pname: {
        type: Sequelize.STRING,
        allowNull: true
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    id_type_product: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: true
    },


},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'product'
});

module.exports = product;