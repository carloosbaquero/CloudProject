import express from 'express'
import controllerSocialContent from '../controllers/controllerSocialContent.js'

const routesContents = express()

routesContents.get('/contents', controllerSocialContent.indexSocialContents)
routesContents.get('/contents/:id', controllerSocialContent.getContent)
routesContents.get('/contents/users', controllerSocialContent.indexSocialContentWithUser)

export default routesContents
