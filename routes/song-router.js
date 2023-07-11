const express = require('express')

const SongCtrl = require('../controllers/song-controller')

const songRouter = express.Router()

songRouter.post('/song', SongCtrl.createSong)
songRouter.put('/song/:id', SongCtrl.updateSong)
songRouter.delete('/song/:id', SongCtrl.deleteSong)
songRouter.get('/song/:id', SongCtrl.getSongById)
songRouter.get('/songs', SongCtrl.getSongs)
songRouter.post('/songs/similar', SongCtrl.getSimilarSongs)

module.exports = songRouter