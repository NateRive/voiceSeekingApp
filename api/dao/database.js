const Sequelize = require('sequelize');

// TODO:環境ごと（producition、development、test）で設定が分かれるようにすること。

const sequelize = new Sequelize('voiceseek', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
