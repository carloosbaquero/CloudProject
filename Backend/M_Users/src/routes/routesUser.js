import express from 'express'
import controllerUser from '../controllers/controllerUser.js'
import middlewareUser from '../middlewares/middlewareUser.js'

const routesUser = express()

routesUser.post('/users', controllerUser.createUser)
routesUser.get('/users/index', controllerUser.getUsers)
routesUser.put('/users',
  middlewareUser.authenticateToken,
  controllerUser.updateUserAuthenticated
)
routesUser.put('/users/pro',
  middlewareUser.authenticateToken,
  controllerUser.updateUserToPro
)
routesUser.put('/users/pro/check',
  middlewareUser.authenticateToken,
  controllerUser.checkProStatus
)
routesUser.delete('/profile',
  middlewareUser.authenticateToken,
  controllerUser.deleteProfileImageFile
)
routesUser.delete('/users',
  middlewareUser.authenticateToken,
  controllerUser.deleteUserAuthenticated
)
routesUser.post('/users/login', controllerUser.logIn)
routesUser.get('/users',
  middlewareUser.authenticateToken,
  controllerUser.getUserAuthenticated
)
routesUser.post('/profile',
  middlewareUser.authenticateToken,
  controllerUser.saveProfileImageFile
)
routesUser.put('/profile',
  middlewareUser.authenticateToken,
  controllerUser.updateProfileImageFile
)
routesUser.post('/token', controllerUser.token)
routesUser.delete('/users/logout',
  middlewareUser.authenticateToken,
  controllerUser.logOut
)
routesUser.get('/users/:id', controllerUser.getUserById)
routesUser.delete('/users/:id', controllerUser.deleteUserById)

export default routesUser
