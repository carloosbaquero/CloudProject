import express from 'express'
import controllerSocialContent from '../controllers/controllerSocialContent.js'

const routesContents = express.Router()

routesContents.get('/contents', controllerSocialContent.indexSocialContents)
routesContents.get('/contents/users',
  controllerSocialContent.indexContentWithUser
)
routesContents.get('/contents/:id', controllerSocialContent.getContent)
routesContents.delete('/contents/users/file/:userId',
  controllerSocialContent.deleteAllFilesContentFromUser
)
routesContents.delete('/contents/users/:userId',
  controllerSocialContent.deleteAllContentFromUser
)

export default routesContents
