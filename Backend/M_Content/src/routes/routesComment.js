import express from 'express'
import controllerComments from '../controllers/controllerComment.js'

const routesComments = express()

routesComments.get('/comments', controllerComments.indexComments)
routesComments.get('/comments/:id', controllerComments.getComment)
routesComments.post('/comments', controllerComments.createComment)
routesComments.put('/comments/:id', controllerComments.updateComment)
routesComments.delete('/comments/:id', controllerComments.deleteComment)
routesComments.get('/comments/image/:id', controllerComments.getCommentsImage)
routesComments.get('/comments/video/:id', controllerComments.getCommentsVideo)

export default routesComments
