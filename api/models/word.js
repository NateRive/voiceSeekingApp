'use strict';
module.exports = (sequelize, DataTypes) => {
  const word = sequelize.define('word', {
    word: DataTypes.STRING,
    starttime: DataTypes.STRING,
    page_id: DataTypes.INTEGER,
    speaker_tag: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  word.associate = function (models) {
    // associations can be defined here
    word.belongsTo(models.page);
  };
  return word;
};