const router = require('express').Router();
const {
  models: { User, Artist, Playlist, Song },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const playlists = await Playlist.findAll({
      order: [['id', 'asc']],
      include: [
        {
          model: Song,
          order: [['id', 'asc']],
        },
      ],
    });
    res.json(playlists);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const playlist = Playlist.create(req.body);
    res.status(201).json(playlist);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const playlist = await Playlist.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Song, include: [{ model: Artist }] }],
    });
    res.status(200).json(playlist);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const playlist = await Playlist.findOne({
      where: {
        id: req.params.id,
      },
    });
    await playlist.update(req.body);
    res.status(200).json(playlist);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const playlist = await Playlist.findOne({
      where: {
        id: req.params.id,
      },
    });
    await playlist.destroy();
    res.status(200).json(playlist);
  } catch (error) {
    next(error);
  }
});
