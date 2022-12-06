import express from 'express'
import { controllerVideos } from '../controllers/controllerVideo.js'

const routesVideos = express()

routesVideos.get('/videos', controllerVideos.indexVideos)
routesVideos.get('/videos/:id', controllerVideos.getVideo)
routesVideos.post('/videos', controllerVideos.createVideo)
routesVideos.put('/videos/:id', controllerVideos.updateVideo)
routesVideos.delete('/videos/:id', controllerVideos.deleteVideo)
routesVideos.get('/videos/file', controllerVideos.saveVideoFile) // ESTO AL FINAL VA A SER UN POST
routesVideos.get('/videos/file/:id', controllerVideos.deleteVideoFile) // ESTA SERA UN DEL AL FINAL

export { routesVideos }
