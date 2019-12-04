'use strict';
module.exports = (sequelize, DataTypes) => {
  const workspace = sequelize.define('workspace', {
    name: DataTypes.STRING,
  }, {
    underscored: true,
  });
  workspace.associate = function (models) {
    // associations can be defined here
  };
  return workspace;
};