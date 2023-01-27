import express from 'express'
import controllerUser from '../controllers/controllerUsers.js'
import middlewareContent from '../middlewares/middlewareContent.js'

const routesUsers = express.Router()

routesUsers.post('/', controllerUser.createUser)
routesUsers.put('/',
  middlewareContent.authenticateToken,
  controllerUser.updateUser
)
routesUsers.delete('/',
  middlewareContent.authenticateToken,
  controllerUser.deleteAuthenticatedUser
)
routesUsers.get('/',
  middlewareContent.authenticateToken,
  controllerUser.getAuthenticatedUser
)
routesUsers.post('/profile',
  middlewareContent.authenticateToken,
  controllerUser.createProfilePicture
)
routesUsers.put('/profile',
  middlewareContent.authenticateToken,
  controllerUser.updateProfilePicture
)
routesUsers.delete('/profile',
  middlewareContent.authenticateToken,
  controllerUser.deleteProfilePicture
)
routesUsers.put('/pro',
  middlewareContent.authenticateToken,
  controllerUser.updateUserPro
)
routesUsers.put('/check',
  middlewareContent.authenticateToken,
  controllerUser.checkUserPro
)
routesUsers.get('/all', controllerUser.getAllUsers)
routesUsers.post('/login', controllerUser.logIn)
routesUsers.delete('/logout',
  middlewareContent.authenticateToken,
  controllerUser.logOut
)
routesUsers.post('/token', controllerUser.refreshToken)
routesUsers.get('/:id', controllerUser.getUser)
routesUsers.delete('/:id', controllerUser.deleteUser)

export default routesUsers
