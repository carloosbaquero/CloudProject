import express from 'express'
import controllerUser from '../controllers/controllerUser.js'
import middlewareUser from '../middlewares/middlewareUser.js'

const routesUser = express()

routesUser.post('/users', controllerUser.createUser)
routesUser.put('/users', middlewareUser.authenticateToken, controllerUser.updateUserAuthenticated)
routesUser.put('/users/pro', middlewareUser.authenticateToken, controllerUser.updateUserToPro)
// GUARDAR CUANDO SE HA COMVERTIDO EN PRO EL USUARIO
// HACER UNA RUTA QUE COMPRUEBE QUE NO SE HA TERMINADO SU PERIODO DE PRO
routesUser.delete('/users', middlewareUser.authenticateToken, controllerUser.deleteUserAuthenticated)
routesUser.delete('/users/:id', controllerUser.deleteUserById)
routesUser.post('/users/login', controllerUser.logIn)
routesUser.get('/users', middlewareUser.authenticateToken, controllerUser.getUserAuthenticated)
routesUser.get('/users/:id', controllerUser.getUserById)
routesUser.post('/users/profile', middlewareUser.authenticateToken, controllerUser.saveProfileImageFile)
routesUser.put('/users/profile', middlewareUser.authenticateToken, controllerUser.updateProfileImageFile)
routesUser.delete('users/profile', middlewareUser.authenticateToken, controllerUser.deleteProfileImageFile)
routesUser.post('/token', controllerUser.token)
routesUser.delete('/users/logout', middlewareUser.authenticateToken, controllerUser.logOut)

export default routesUser
