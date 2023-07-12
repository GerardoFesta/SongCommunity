const express = require('express')

const UserCtrl = require('../controllers/user-controller')

const userRouter = express.Router()

userRouter.post('/user', UserCtrl.createUser)
userRouter.put('/user/:id', UserCtrl.updateUser)
userRouter.delete('/user/:id', UserCtrl.deleteUser)
userRouter.get('/user/:id', UserCtrl.getUserById)
userRouter.get('/users', UserCtrl.getUsers)
userRouter.post('/user/login', UserCtrl.login);
userRouter.post('/user/register', UserCtrl.register)
userRouter.post('/user/preferite', UserCtrl.setUserFavorites)
userRouter.get('/user/similar/:id', UserCtrl.getSimilarUsers)
userRouter.get('/user/artists/:id', UserCtrl.getUserFavouriteArtists)
userRouter.get('/user/genres/:id', UserCtrl.getUserFavouriteGenres)


module.exports = userRouter