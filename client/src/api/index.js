import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertSong = payload => api.post(`/song`, payload)
export const getAllSongs = () => api.get(`/songs`)
export const updateSongById = (id, payload) => api.put(`/song/${id}`, payload)
export const deleteSongById = id => api.delete(`/song/${id}`)
export const getSongById = id => api.get(`/song/${id}`)

export const createUser = payload => api.post(`/user`, payload)
export const getAllUser = () => api.get(`/users`)
export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload)
export const deleteUserById = id => api.delete(`/user/${id}`)
export const getUserById = id => api.get(`/user/${id}`)

const apis = {
    insertSong,
    getAllSongs,
    updateSongById,
    deleteSongById,
    getSongById,
    createUser,
    getAllUser,
    updateUserById,
    deleteUserById,
    getUserById,
}

export default apis