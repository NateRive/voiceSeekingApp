const Sequelize = require('sequelize');
const db = require("../dao/database");
const Audio = require("./audio");

const Word = db.define('word', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  word: Sequelize.STRING,
  starttime: Sequelize.STRING,
  audio_id: Sequelize.INTEGER,
  speaker_tag: Sequelize.INTEGER
}, {
  underscored: true,
});
Audio.hasMany(Word, {
  as: "word",
  foreignKey: "audio_id",
  sourcekey: "id"
})
module.exports = Word