import express from 'express'
import controllerSocialContent from '../controllers/controllerSocialContent.js'

const routesVideos = express()

routesVideos.get('/videos', controllerSocialContent.indexVideoContents)
routesVideos.get('/videos/:id', controllerSocialContent.getContent)
routesVideos.post('/videos', controllerSocialContent.createVideoContent)
routesVideos.put('/videos/:id', controllerSocialContent.updateContent)
routesVideos.delete('/videos/:id', controllerSocialContent.deleteContent)
routesVideos.post('/videos/file', controllerSocialContent.saveVideoContentFile)
routesVideos.delete('/videos/file/:id', controllerSocialContent.deleteContentVideoFile)
routesVideos.get('/videos/file/:id', controllerSocialContent.getPublicURLVideoFile)

export default routesVideos
