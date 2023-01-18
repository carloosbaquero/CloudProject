import express from 'express'
import controllerSocialContent from '../controllers/controllerSocialContent.js'
import middlewareContent from '../middlewares/middlewareContent.js'

const routesImages = express()

routesImages.get('/images', controllerSocialContent.indexImageContents)
routesImages.get('/images/:id', controllerSocialContent.getContent)
routesImages.post('/images',
  middlewareContent.authenticateToken,
  controllerSocialContent.createImageContent
)
routesImages.put('/images/:id',
  middlewareContent.authenticateToken,
  controllerSocialContent.updateContent
)
routesImages.delete('/images/:id',
  middlewareContent.authenticateToken,
  controllerSocialContent.deleteContent
)
routesImages.post('/images/file',
  middlewareContent.authenticateToken,
  controllerSocialContent.saveImageContentFile
)
routesImages.delete('/images/file/:id',
  middlewareContent.authenticateToken,
  controllerSocialContent.deleteContentImageFile
)
routesImages.get('/images/file/:id',
  controllerSocialContent.getPublicURLImageFile
)

export default routesImages
