const Sequelize = require('sequelize');
const db = require("../dao/database");

const Word = db.define('word', {
  word: Sequelize.STRING,
  starttime: Sequelize.STRING,
  audio_id: Sequelize.INTEGER,
  speaker_tag: Sequelize.INTEGER
}, {
  underscored: true,
});
Word.associate = function (models) {
  // associations can be defined here
  Word.belongsTo(models.audio);
};
module.exports = Word