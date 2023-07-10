const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        Username: { type: String, required: true },
        Email: { type: String, required: true },
        Preferite: { type: [Number], required: true },
        Password: { type: String, required: true },
    },
    { collection: 'Users' },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)