const Song = require('../schemas/song-schema')
const User = require('../schemas/user-schema')

createSong = async (req, res) => {
    const body = req.body

    const maxSongIdRecord = await Song.findOne({}, { song_id: 1 }).sort({
      song_id: -1,
    });

    let newSongId = 1;

    if (maxSongIdRecord) {
      newSongId = maxSongIdRecord.song_id + 1;
    }

    const song = new Song({
      ...body,
      song_id: newSongId,
    });



    console.log(body)
    if (!body) {
        console.log("NOT BODY")
        return res.status(400).json({
            success: false,
            error: 'You must provide a song',
        })
    }

    if (!song) {
      console.log("NOT SONG")
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
            console.log(error)
            return res.status(400).json({
                error,
                message: 'Song not created!',
            })
        })
}

updateSong = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  try {
    const song = await Song.findOne({ song_id: req.params.id });

    if (!song) {
      return res.status(404).json({
        message: 'Song not found!',
      });
    }

    song.spotify_uri = body.spotify_uri;
    song.artists = body.artists;
    song.album_name = body.album_name;
    song.track_name = body.track_name;
    song.popularity = body.popularity;
    song.duration_ms = body.duration_ms;
    song.explicit = body.explicit;
    song.danceability = body.danceability;
    song.energy = body.energy;
    song.key = body.key;
    song.loudness = body.loudness;
    song.mode = body.mode;
    song.speechiness = body.speechiness;
    song.acousticness = body.acousticness;
    song.instrumentalness = body.instrumentalness;
    song.liveness = body.liveness;
    song.valence = body.valence;
    song.tempo = body.tempo;
    song.time_signature = body.time_signature;
    song.track_genre = body.track_genre;

    await song.save();

    return res.status(200).json({
      success: true,
      id: song._id,
      message: 'Song updated!',
    });
  } catch (error) {
    return res.status(404).json({
      error,
      message: 'Song not updated!',
    });
  }
};


deleteSong = async (req, res) => {
    try{

    
      const del = await Song.findOneAndDelete({ song_id: req.params.id })

      await User.updateMany({}, { $pull: { Preferite: req.params.id } });
      
      return res.status(200).json({ success: true})
    
    }catch(err){
      console.log(err)
      return res.status(400).json({ success: false, error: err })
    }

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
      const songs = await Song.find({}, {
        song_id: 1,
        spotify_uri: 1,
        artists: 1,
        track_name: 1,
        track_genre: 1,
        _id: 0, 
      }).sort({ song_id: 1 });
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

const getSimilarSongs = async (req, res) =>{
    try{
        const{id, preferite} = req.body
        const songIds = preferite.map(item => item.song_id);
        const song = await Song.findOne({ song_id: id });
        if (!song) {
            return res.status(404).json({ success: false, error: 'Song not found' });
        }
        
        const similarSongs = await Song.aggregate([
            {
              $match: {
                song_id: {
                  $nin: songIds
                }
              }
            },
            {
              $addFields: {
                distance: {
                  $sqrt: {
                    $sum: [
                        {
                            $pow: [
                              { $subtract: ['$duration_ms', parseInt(song.duration_ms)] },
                              2
                            ]
                          },
                          {
                            $cond: {
                              if: { $eq: ['$explicit', song.explicit] },
                              then: 0,
                              else: 1
                            }
                          },
                          {
                            $pow: [
                              { $subtract: ['$danceability', parseFloat(song.danceability)] },
                              2
                            ]
                          },
                          {
                            $pow: [
                              { $subtract: ['$energy', parseFloat(song.energy)] },
                              2
                            ]
                          },
                          {
                            $pow: [
                              { $subtract: ['$key', parseInt(song.key)] },
                              2
                            ]
                          },
                          {
                            $pow: [
                              { $subtract: ['$loudness', parseFloat(song.loudness)] },
                              2
                            ]
                          },
                          {
                            $pow: [
                              { $subtract: ['$mode', parseInt(song.mode)] },
                              2
                            ]
                          },
                          {
                            $pow: [
                              { $subtract: ['$speechiness', parseFloat(song.speechiness)] },
                              2
                            ]
                          },
                          {
                            $pow: [
                              { $subtract: ['$acousticness', parseFloat(song.acousticness)] },
                              2
                            ]
                          },
                          {
                            $pow: [
                              { $subtract: ['$instrumentalness', parseFloat(song.instrumentalness)] },
                              2
                            ]
                          },
                          {
                            $pow: [
                              { $subtract: ['$liveness', parseFloat(song.liveness)] },
                              2
                            ]
                          },
                          {
                            $pow: [
                              { $subtract: ['$valence', parseFloat(song.valence)] },
                              2
                            ]
                          },
                          {
                            $pow: [
                              { $subtract: ['$tempo', parseFloat(song.tempo)] },
                              2
                            ]
                          },
                          {
                            $pow: [
                              { $subtract: ['$time_signature', parseInt(song.time_signature)] },
                              2
                            ]
                          },
                          {
                            $cond: {
                              if: { $eq: ['$track_genre', song.track_genre] },
                              then: 0,
                              else: 1
                            }
                          }
                          
                    ]
                  }
                }
              }
            },
            {
              $sort: { distance: 1 } // Ordina i risultati per distanza crescente
            },
            {
              $limit: 5 // Restituisci solo le prime 5 canzoni più simili
            }
          ]);
      
        return res.status(200).json({ success: true, data: similarSongs });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, error: err });
      }
}

module.exports = {
    createSong,
    updateSong,
    deleteSong,
    getSongs,
    getSongById,
    getSimilarSongs
}