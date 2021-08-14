const router = require('express').Router();
const {
  models: { User, Artist, Playlist, Song },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const songs = await Song.findAll({
      order: [['id', 'asc']],
      include: [{ model: Artist }],
    });
    res.status(200).json(songs);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const song = await Song.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(song);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const song = await Song.findOne({
      where: {
        id: req.params.id,
      },
    });
    await song.update(req.body);
    res.status(200).json(song);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const song = await Song.findOne({
      where: {
        id: req.params.id,
      },
    });
    await song.destroy();
    res.status(200).send(song);
  } catch (error) {
    next(error);
  }
});
