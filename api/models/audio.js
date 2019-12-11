const Sequelize = require('sequelize');
const db = require("../dao/database");

const Audio = db.define('audio', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: Sequelize.STRING,
    page_id: Sequelize.INTEGER,
    created_at: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updated_at: {
        allowNull: false,
        type: Sequelize.DATE
    }
}, {
    underscored: true,
});
module.exports = Audio