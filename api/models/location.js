'use strict';
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    folder: DataTypes.STRING,
    file: DataTypes.STRING,
    progress: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  location.associate = function(models) {
    // associations can be defined here
    location.hasMany(models.word);
  };
  return location;
};