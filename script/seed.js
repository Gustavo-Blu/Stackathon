'use strict';

const {
  db,
  models: { User, Artist, Playlist, Song },
} = require('../server/db');
const { songs } = require('../songs');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'Gus',
      password: '123',
      email: 'gustavoallen92@gmail.com',
    }),
    User.create({
      username: 'murphy',
      password: '123',
      email: 'bigga772@gmail.com',
    }),
  ]);

  // artists
  const artists = await Promise.all([
    Artist.create({ name: 'Dexter Britain' }),
    Artist.create({ name: 'Jets Overhead' }),
    Artist.create({ name: 'Nine Inch Nails' }),
  ]);

  // playlists
  const playlists = await Promise.all([
    Playlist.create({
      title: `Creative Commons Volume 2\n By: ${artists[0].name}`,
      imageUrl:
        'https://learndotresources.s3.amazonaws.com/workshop/58cff0e769468300041ef9fd/creative_commons_vol_2.jpeg',
    }),
    Playlist.create({
      title: `Zenith\n By: ${artists[0].name}`,
      imageUrl:
        'https://learndotresources.s3.amazonaws.com/workshop/58cff0e769468300041ef9fd/zenith.jpeg',
    }),
    Playlist.create({
      title: `No Nations (Instrumentals)\n By: ${artists[1].name}`,
      imageUrl:
        'https://learndotresources.s3.amazonaws.com/workshop/58cff0e769468300041ef9fd/no_nations.jpeg',
    }),
    Playlist.create({
      title: `Ghosts I-IV\n By: ${artists[2].name}`,
      imageUrl:
        'https://learndotresources.s3.amazonaws.com/workshop/58cff0e769468300041ef9fd/ghosts_i-iv.jpeg',
    }),
    Playlist.create({
      title: `The Slip\n By:${artists[2].name}`,
      imageUrl:
        'https://learndotresources.s3.amazonaws.com/workshop/58cff0e769468300041ef9fd/the_slip.jpeg',
    }),
  ]);

  // songs.map(async (song) => {
  //   console.log(song.genre);
  // });
  // await Promise.all(
  //   songs.map((song) => {
  //     Song.create({
  //       title: song.name,
  //       audioUrl: song.audioUrl,
  //       genre: song.genre,
  //     });
  //   })
  // );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${artists.length} artists`);
  console.log(`seeded ${playlists.length} playlists`);
  console.log(`seeded ${songs.length} songs`);
  console.log(`seeded successfully`);

  let codeBase = {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    artists: {
      'Dexter Britain': artists[0],
      'Jets Overhead': artists[1],
      'Nine Inch Nails': artists[2],
    },
    playlists: {
      'Creative Commons Volume 2': playlists[0],
      Zenith: playlists[1],
      'No Nations (Instrumentals)': playlists[2],
      'Ghosts I-IV': playlists[3],
      'The Slip': playlists[4],
    },
  };

  for (let i = 0; i < songs.length; i++) {
    let newSong = await Song.create({
      title: songs[i].name,
      audioUrl: songs[i].audioUrl,
      genre: songs[i].genre,
      imageUrl: songs[i].imageUrl,
      artistId: codeBase.artists[songs[i].artist].id,
    });
    await newSong.addPlaylist(codeBase.playlists[songs[i].playlist].id);
    // artistId: codeBase.artists[songs[i].artist].id,
  }

  return codeBase;
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
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

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
