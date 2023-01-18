import express from 'express'
import controllerUser from '../controllers/controllerUser.js'
import middlewareUser from '../middlewares/middlewareUser.js'

const routesUser = express()

routesUser.post('/users', controllerUser.createUser)
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
routesUser.delete('/users',
  middlewareUser.authenticateToken,
  controllerUser.deleteUserAuthenticated
)
routesUser.delete('/users/:id', controllerUser.deleteUserById)
routesUser.post('/users/login', controllerUser.logIn)
routesUser.get('/users',
  middlewareUser.authenticateToken,
  controllerUser.getUserAuthenticated
)
routesUser.get('/users/:id', controllerUser.getUserById)
routesUser.post('/users/profile',
  middlewareUser.authenticateToken,
  controllerUser.saveProfileImageFile
)
routesUser.put('/users/profile',
  middlewareUser.authenticateToken,
  controllerUser.updateProfileImageFile
)
routesUser.delete('users/profile',
  middlewareUser.authenticateToken,
  controllerUser.deleteProfileImageFile
)
routesUser.post('/token', controllerUser.token)
routesUser.delete('/users/logout',
  middlewareUser.authenticateToken,
  controllerUser.logOut
)

export default routesUser
