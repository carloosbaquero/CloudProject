import express from 'express'
import controllerUser from '../controllers/controllerUsers.js'

const routesUsers = express()

routesUsers.post('/users', controllerUser.logIn)
routesUsers.post('/users/token', controllerUser.refreshToken)

export default routesUsers
