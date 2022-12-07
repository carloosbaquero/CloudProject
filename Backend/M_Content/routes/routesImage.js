import express from 'express'
import controllerSocialContent from '../controllers/controllerSocialContent.js'

const routesImages = express()

routesImages.get('/images', controllerSocialContent.indexImageContents)
routesImages.get('/images/:id', controllerSocialContent.getContent)
routesImages.post('/images', controllerSocialContent.createImageContent)
routesImages.put('/images/:id', controllerSocialContent.updateContent)
routesImages.delete('/images/:id', controllerSocialContent.deleteContent)
routesImages.post('/images/file', controllerSocialContent.saveImageContentFile)
routesImages.delete('/images/file/:id', controllerSocialContent.deleteContentImageFile)
routesImages.get('/images/file/:id', controllerSocialContent.getContentImageFile)

export default routesImages
