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
routesComments.get('/comments/content/:contentId',
  controllerComments.getCommentsContent
)
routesComments.delete('/comments/users/:userId',
  controllerComments.deleteAllCommentsFromUser
)

export default routesComments
