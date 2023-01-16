import express from 'express'
import controllerUser from '../controllers/controllerUser.js'
import middlewareUser from '../middlewares/middlewareUser.js'

const routesUser = express()

routesUser.post('/users', controllerUser.createUser)
routesUser.post('/users/login', controllerUser.logIn)
routesUser.get('/users', middlewareUser.authenticateToken, controllerUser.getUser)
routesUser.post('/token', controllerUser.token)
routesUser.delete('/users/logout', controllerUser.logOut)

export default routesUser
