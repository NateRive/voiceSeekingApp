const Sequelize = require('sequelize');
const db = require("../dao/database");

const Workspace = db.define('workspace', {
  name: Sequelize.STRING,
}, {
  underscored: true,
});
Workspace.associate = function (models) {
  // associations can be defined here
};
module.exports = Workspace