import express from 'express'
import controllerImages from '../controllers/controllerImage.js'

const routesImages = express()

routesImages.get('/images', controllerImages.indexImages)
routesImages.get('/images/:id', controllerImages.getImage)
routesImages.post('/images', controllerImages.createImage)
routesImages.put('/images/:id', controllerImages.updateImage)
routesImages.delete('/images/:id', controllerImages.deleteImage)
routesImages.post('/images/file', controllerImages.saveImageFile)
routesImages.delete('/images/file/:id', controllerImages.deleteImageFile)
routesImages.get('/images/file/:id', controllerImages.getImageFile)

export default routesImages
