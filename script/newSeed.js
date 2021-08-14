'use strict';

const fs = require('fs');
const {
  db,
  models: { Playlist, Artist, Song },
} = require('../server/db');
const songs = JSON.parse(fs.readFileSync('songs.json', 'utf8'));

const seed = async () => {
  await db.sync({ force: true });

  // artists
  const dexter = await Artist.create({ name: 'Dexter Britain' });
  const jets = await Artist.create({ name: 'Jets Overhead' });
  const nin = await Artist.create({ name: 'Nine Inch Nails' });

  // albums
  const ccv2 = await Playlist.create({
    name: `Creative Commons Volume 2\n By: ${dexter.name}`,
    imageUrl:
      'https://learndotresources.s3.amazonaws.com/workshop/58cff0e769468300041ef9fd/creative_commons_vol_2.jpeg',
  });
  const zenith = await Playlist.create({
    name: `Zenith\n By: ${dexter.name}`,
    imageUrl:
      'https://learndotresources.s3.amazonaws.com/workshop/58cff0e769468300041ef9fd/zenith.jpeg',
  });
  const noNations = await Playlist.create({
    name: `No Nations (Instrumentals)\n By: ${jets.name}`,
    imageUrl:
      'https://learndotresources.s3.amazonaws.com/workshop/58cff0e769468300041ef9fd/no_nations.jpeg',
  });
  const ghosts = await Playlist.create({
    name: `Ghosts I-IV\n By: ${nin.name}`,
    imageUrl:
      'https://learndotresources.s3.amazonaws.com/workshop/58cff0e769468300041ef9fd/ghosts_i-iv.jpeg',
  });
  const theSlip = await Playlist.create({
    name: `The Slip\n By:${nin.name}`,
    imageUrl:
      'https://learndotresources.s3.amazonaws.com/workshop/58cff0e769468300041ef9fd/the_slip.jpeg',
  });

  // const artists = {
  //   'Dexter Britain': dexter,
  //   'Nine Inch Nails': nin,
  //   'Jets Overhead': jets,
  // };

  // const playlists = {
  //   'Creative Commons Volume 2': ccv2,
  //   Zenith: zenith,
  //   'No Nations (Instrumentals)': noNations,
  //   'Ghosts I-IV': ghosts,
  //   'The Slip': theSlip,
  // };

  // await Promise.all(
  //   songs.map((song) => {
  //     Song.create({
  //       name: song.name,
  //       audioUrl: song.audioUrl,
  //       genre: song.genre,
  // artistId: artists[song.artist].id,
  // });
  // let playlist = Playlist.findByPk(playlists[song.playlist].id);
  // playlist.addSong(song);
  // albumId: albums[song.album].id,
  // })
  // );

  db.close();
  console.log(`
  Seeding successful!
  Juke is now ready to rock!
  `);
};

seed().catch((err) => {
  db.close();
  console.log(`
  Error seeding:
  ${err.message}
  ${err.stack}
  `);
});

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
