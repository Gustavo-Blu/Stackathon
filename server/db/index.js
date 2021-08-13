//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Artist = require('./models/Artist');
const Playlist = require('./models/Playlist');
const Song = require('./models/Song');

//associations could go here!
User.hasMany(Song);
User.hasMany(Artist);
User.hasMany(Playlist);

Song.belongsTo(User);
Song.belongsTo(Artist);
Song.belongsToMany(Playlist, { through: 'songTable' });

Artist.belongsTo(User);
Artist.hasMany(Song);

Playlist.belongsTo(User);
Playlist.belongsToMany(Song, { through: 'songTable' });

module.exports = {
  db,
  models: {
    User,
    Artist,
    Playlist,
    Song,
  },
};
