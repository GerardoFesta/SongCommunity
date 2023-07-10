const express = require('express')

const UserCtrl = require('../controllers/user-controller')

const userRouter = express.Router()

userRouter.post('/user', UserCtrl.createUser)
userRouter.put('/user/:id', UserCtrl.updateUser)
userRouter.delete('/user/:id', UserCtrl.deleteUser)
userRouter.get('/user/:id', UserCtrl.getUserById)
userRouter.get('/users', UserCtrl.getUsers)

module.exports = userRouter