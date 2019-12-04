'use strict';
module.exports = (sequelize, DataTypes) => {
  const page = sequelize.define('page', {
    name: DataTypes.STRING,
    parent_id: DataTypes.INTEGER,
    isfile: DataTypes.BOOLEAN,
    workspace_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  page.associate = function (models) {
    // associations can be defined here
    page.hasMany(models.word);
    page.belongsTo(models.workspace)
  };
  return page;
};