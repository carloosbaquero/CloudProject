import express from 'express'
import controllerSocialContent from '../controllers/controllerSocialContent.js'
import middlewareContent from '../middlewares/middlewareContent.js'

const routesVideos = express()

routesVideos.get('/videos', controllerSocialContent.indexVideoContents)
routesVideos.get('/videos/:id', controllerSocialContent.getContent)
routesVideos.post('/videos',
  middlewareContent.authenticateToken,
  controllerSocialContent.createVideoContent
)
routesVideos.put('/videos/:id',
  middlewareContent.authenticateToken,
  controllerSocialContent.updateContent
)
routesVideos.delete('/videos/:id',
  middlewareContent.authenticateToken,
  controllerSocialContent.deleteContent
)
routesVideos.post('/videos/file',
  middlewareContent.authenticateToken,
  controllerSocialContent.saveVideoContentFile
)
routesVideos.delete('/videos/file/:id',
  middlewareContent.authenticateToken,
  controllerSocialContent.deleteContentVideoFile
)
routesVideos.get('/videos/file/:id',
  middlewareContent.authenticateToken,
  controllerSocialContent.getPublicURLVideoFile
)

export default routesVideos
