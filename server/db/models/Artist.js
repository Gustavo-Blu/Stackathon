const Sequelize = require('sequelize');
const db = require('../db');

const Artist = db.define('artist', {
  name: {
    type: Sequelize.STRING,
    notNull: false,
    notEmpty: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/1280px-A_black_image.jpg',
  },
});

module.exports = Artist;
