const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Song = new Schema(
    {
        song_id: { type: Number, required: true },
        spotify_uri: { type: String, required: true },
        artists: { type: [String], required: true },
        album_name: { type: String, required: true },
        track_name: { type: String, required: true },
        popularity: { type: Number, required: true },
        duration_ms: { type: Number, required: true },
        explicit: { type: Boolean, required: true },
        danceability: { type: Number, required: true },
        energy: { type: Number, required: true },
        key: { type: Number, required: true },
        loudness: { type: Number, required: true },
        mode: { type: Number, required: true },
        speechiness: { type: Number, required: true },
        acousticness: { type: Number, required: true },
        instrumentalness: { type: Number, required: true },
        liveness: { type: Number, required: true },
        valence: { type: Number, required: true },
        tempo: { type: Number, required: true },
        time_signature: { type: Number, required: true },
        track_genre: { type: [String], required: true },
    },
    { collection: 'Songs' },
    { timestamps: true },
)

module.exports = mongoose.model('Songs', Song)