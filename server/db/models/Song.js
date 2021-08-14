const Sequelize = require('sequelize');
const db = require('../db');

const Song = db.define('song', {
  title: {
    type: Sequelize.STRING,
    isNull: false,
    notEmpty: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/1280px-A_black_image.jpg',
  },
  audioUrl: {
    type: Sequelize.STRING,
  },
  genre: {
    type: Sequelize.STRING,
    defaultValue: 'other',
  },
});

module.exports = Song;
