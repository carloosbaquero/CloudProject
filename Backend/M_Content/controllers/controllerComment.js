import Comments from '../models/Comment.js'
/* import Images from '../models/Image.js'
import Videos from '../models/Video.js' */

const controllerComments = {}

controllerComments.indexComments = async (req, res) => {
  try {
    const comments = await Comments.findAll()
    res.status(200).json(comments)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerComments.createComment = async (req, res) => {
  try {
    const comment = Comments.build()
    const data = req.body
    comment.text = data.text
    comment.userId = Number(data.userId)
    comment.imageId = Number(data?.imageId)
    comment.videoId = Number(data?.videoId)
    const result = await comment.save()
    res.status(201).json(result)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerComments.updateComment = async (req, res) => {
  try {
    const data = req.body
    await Comments.update(data, {
      where: {
        id: req.params.id
      },
      fields: ['text']
    })
    const updateComment = await Comments.findByPk(req.params.id)
    res.status(200).json(updateComment)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerComments.deleteComment = async (req, res) => {
  try {
    const result = await Comments.destroy({
      where: {
        id: req.params.id
      }
    })
    let message
    if (result === 1) message = `Comment with id = ${req.params.id} delete sucessfully.`
    else message = 'Could not delete comment'
    res.status(200).json(message)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerComments.getComment = async (req, res) => {
  try {
    const comment = await Comments.findByPk(req.params.id)
    res.status(200).json(comment)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerComments.getCommentsImage = async (req, res) => {
  try {
    const comments = await Comments.findAll({
      where: {
        imageId: req.params.imageId
      }
    })
    res.status(200).json(comments)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerComments.getCommentsVideo = async (req, res) => {
  try {
    const comments = await Comments.findAll({
      where: {
        videoId: req.params.videoId
      }
    })
    res.status(200).json(comments)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

export default controllerComments
