import express from 'express'
import controllerSocialContent from '../controllers/controllerSocialContent.js'
import middlewareContent from '../middlewares/middlewareContent.js'

const routesImages = express.Router()

routesImages.get('/images', controllerSocialContent.indexImageContents)
routesImages.post('/images',
  middlewareContent.authenticateToken,
  controllerSocialContent.createImageContent
)
routesImages.post('/images/file',
  middlewareContent.authenticateToken,
  controllerSocialContent.saveContentFile
)
routesImages.get('/images/user/:userId', controllerSocialContent.indexImageContentsUser)
routesImages.delete('/images/file/:id',
  middlewareContent.authenticateToken,
  controllerSocialContent.deleteContentFile
)
routesImages.get('/images/file/:id',
  controllerSocialContent.getPublicURLFile
)
routesImages.put('/images/:id',
  middlewareContent.authenticateToken,
  controllerSocialContent.updateContent
)
routesImages.delete('/images/:id',
  middlewareContent.authenticateToken,
  controllerSocialContent.deleteContent
)

export default routesImages
