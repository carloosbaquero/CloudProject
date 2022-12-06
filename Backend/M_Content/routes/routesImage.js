import express from 'express'
import { controllerImages } from '../controllers/controllerImage.js'

const routesImages = express()

routesImages.get('/images', controllerImages.indexImages)
routesImages.get('/images/:id', controllerImages.getImage)
routesImages.post('/images', controllerImages.createImage)
routesImages.put('/images/:id', controllerImages.updateImage)
routesImages.delete('/images/:id', controllerImages.deleteImage)
routesImages.get('/images/file', controllerImages.saveImageFile) // AL FINAL ESTO VA A SER UN POST
routesImages.get('/images/file/:id', controllerImages.deleteImageFile) // AL FINAL ESTA VA A SER DEL

export { routesImages }
