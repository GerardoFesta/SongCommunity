const Song = require('../schemas/song-schema')

createSong = (req, res) => {
    const body = req.body
    console.log(body)
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a song',
        })
    }

    const song = new Song(body)

    if (!song) {
        return res.status(400).json({success: false, error: err })
    }

    song
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: song._id,
                message: 'Song created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Song not created!',
            })
        })
}

updateSong = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Song.findOne({ _id: req.params.id }, (err, song) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Song not found!',
            })
        }
        song.song_id= body.song_id
        song.spotify_uri= body.spotify_uri
        song.artists= body.artists
        song.album_name= body.album_name
        song.track_name= body.track_name
        song.popularity= body.popularity
        song.duration_ms= body.duration_ms
        song.explicit= body.explicit
        song.danceability= body.danceability
        song.energy= body.energy
        song.key= body.key
        song.loudness= body.loudness
        song.mode= body.mode
        song.speechiness= body.speechiness
        song.acousticness= body.acousticness
        song.instrumentalness= body.instrumentalness
        song.liveness= body.liveness
        song.valence= body.valence
        song.tempo= body.tempo
        song.time_signature= body.time_signature
        song.track_genre= body.track_genre

        song
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: song._id,
                    message: 'Song updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Song not updated!',
                })
            })
    })
}

deleteSong = async (req, res) => {
    await Song.findOneAndDelete({ song_id: req.params.id }, (err, song) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!song) {
            return res
                .status(404)
                .json({ success: false, error: `Song not found` })
        }

        return res.status(200).json({ success: true, data: song })
    }).catch(err => console.log(err))
}

const getSongById = async (req, res) => {
    try {
      const song = await Song.findOne({ song_id: req.params.id });
  
      if (!song) {
        return res.status(404).json({ success: false, error: 'Song not found' });
      }
  
      return res.status(200).json({ success: true, data: song });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false, error: err });
    }
  };
  

const getSongs = async (req, res) => {
    try {
      const songs = await Song.find({}).limit(10000);
      console.log(songs);
  
      if (songs.length === 0) {
        return res.status(404).json({ success: false, error: 'Song not found' });
      }
  
      return res.status(200).json({ success: true, data: songs });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false, error: err });
    }
  };

module.exports = {
    createSong,
    updateSong,
    deleteSong,
    getSongs,
    getSongById,
}