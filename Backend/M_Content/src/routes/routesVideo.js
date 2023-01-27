import express from 'express'
import controllerSocialContent from '../controllers/controllerSocialContent.js'
import middlewareContent from '../middlewares/middlewareContent.js'

const routesVideos = express.Router()

routesVideos.get('/videos', controllerSocialContent.indexVideoContents)
routesVideos.post('/videos',
  middlewareContent.authenticateToken,
  controllerSocialContent.createVideoContent
)
routesVideos.post('/videos/file',
  middlewareContent.authenticateToken,
  controllerSocialContent.saveContentFile
)
routesVideos.get('/videos/user/:userId', controllerSocialContent.indexVideoContentUser)
routesVideos.delete('/videos/file/:id',
  middlewareContent.authenticateToken,
  controllerSocialContent.deleteContentFile
)
routesVideos.get('/videos/file/:id',
  controllerSocialContent.getPublicURLFile
)
routesVideos.put('/videos/:id',
  middlewareContent.authenticateToken,
  controllerSocialContent.updateContent
)
routesVideos.delete('/videos/:id',
  middlewareContent.authenticateToken,
  controllerSocialContent.deleteContent
)

export default routesVideos
