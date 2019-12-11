const Sequelize = require('sequelize');
const db = require("../dao/database");
const Page = require("./page");

const Group = db.define('group', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: Sequelize.STRING,
    workspace_id: Sequelize.INTEGER,
    general: Sequelize.BOOLEAN,
    private: Sequelize.BOOLEAN,
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

module.exports = Group