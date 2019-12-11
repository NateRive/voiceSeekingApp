const Sequelize = require('sequelize');
const db = require("../dao/database");
const Group = require("./group");

const Page = db.define('page', {
  name: Sequelize.STRING,
  parent_id: Sequelize.INTEGER,
  isfile: Sequelize.BOOLEAN,
  group_id: Sequelize.INTEGER,
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
Group.hasMany(Page, {
  as: "page",
  foreignKey: "group_id",
  sourceKey: "id"
})
module.exports = Page