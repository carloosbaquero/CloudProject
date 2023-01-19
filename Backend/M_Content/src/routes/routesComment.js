import express from 'express'
import controllerComments from '../controllers/controllerComment.js'
import middlewareContent from '../middlewares/middlewareContent.js'

const routesComments = express()

routesComments.get('/comments', controllerComments.indexComments)
routesComments.get('/comments/:id', controllerComments.getComment)
routesComments.post('/comments',
  middlewareContent.authenticateToken,
  controllerComments.createComment)
routesComments.put('/comments/:id',
  middlewareContent.authenticateToken,
  controllerComments.updateComment)
routesComments.delete('/comments/:id',
  middlewareContent.authenticateToken,
  controllerComments.deleteComment)
routesComments.get('/comments/images/:imageId', controllerComments.getCommentsImage)
routesComments.get('/comments/videos/:videoId', controllerComments.getCommentsVideo)

export default routesComments
