const Sequelize = require('sequelize');
const db = require('../db');

const Playlist = db.define('playlist', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmpty: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/1280px-A_black_image.jpg',
  },
});

module.exports = Playlist;
