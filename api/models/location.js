'use strict';
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    name: DataTypes.STRING,
    parent_id: DataTypes.INTEGER,
    isfile: DataTypes.BOOLEAN
  }, {
    underscored: true,
  });
  location.associate = function (models) {
    // associations can be defined here
    location.hasMany(models.word);
  };
  return location;
};