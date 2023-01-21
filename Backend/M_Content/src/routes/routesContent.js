import express from 'express'
import controllerSocialContent from '../controllers/controllerSocialContent.js'

const routesContents = express.Router()

routesContents.get('/', controllerSocialContent.indexSocialContents)
routesContents.get('/users',
  controllerSocialContent.indexContentWithUser
)
routesContents.get('/:id', controllerSocialContent.getContent)

export default routesContents
