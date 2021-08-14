const router = require('express').Router();
const {
  models: { User, Artist, Playlist, Song },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.findAll({
      order: [['id', 'asc']],
      include: [
        {
          model: Song,
          order: [['id', 'asc']],
        },
      ],
    });
    res.status(200).json(artists);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json(artist);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const artist = await Artist.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(artist);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const artist = await Artist.findOne({
      where: {
        id: req.params.id,
      },
    });
    await artist.update(req.body);
    res.status(200).json(artist);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const artist = await Artist.findOne({
      where: {
        id: req.params.id,
      },
    });
    await artist.destroy();
    res.status(200).json(artist);
  } catch (error) {
    next(error);
  }
});
