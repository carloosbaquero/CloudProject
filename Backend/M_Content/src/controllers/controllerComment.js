import Comments from '../models/Comment.js'
import SocialContent from '../models/SocialContent.js'
import database from '../helpers/sequelize.js'

const controllerComments = {}

controllerComments.indexComments = async (req, res) => {
  try {
    const comments = await Comments.findAll()
    res.status(200).json(comments)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controllerComments.createComment = async (req, res) => {
  const data = req.body
  const t = await database.transaction()
  try {
    if (typeof data?.text !== 'string' || typeof data?.userId !== 'number') throw new Error('Fields missing')
    const imageId = typeof data?.imageId !== 'number' ? null : Number(data.imageId)
    const videoId = typeof data?.videoId !== 'number' ? null : Number(data.videoId)
    if (imageId === null && videoId === null) throw new Error('Comment must belong one image or video')
    const id = imageId === null ? videoId : imageId
    const content = await SocialContent.findByPk(id)
    if (!content) throw new Error('Content not found')
    const comment = Comments.build({ transaction: t })
    comment.text = data.text
    comment.userId = Number(data.userId)
    comment.imageId = imageId
    comment.videoId = videoId
    await comment.save({ transaction: t })
    await t.commit()
    res.sendStatus(201)
  } catch (error) {
    await t.rollback()
    console.error(error)
    if (error.message === 'Fields missing') res.sendStatus(401)
    else if (error.message === 'Content not found') res.sendStatus(404)
    else if (error.message === 'Comment must belong one image or video') res.sendStatus(403)
    else res.status(500).send(error)
  }
}

controllerComments.updateComment = async (req, res) => {
  const t = await database.transaction()
  try {
    const newText = req.body?.text
    if (typeof newText !== 'string') throw new Error('Missing text')
    await Comments.update({ text: newText }, {
      where: {
        id: req.params.id
      },
      fields: ['text']
    }, { transaction: t })
    await t.commit()
    res.status(204)
  } catch (error) {
    await t.rollback()
    console.error(error)
    if (error.message === 'Missing text') res.sendStatus(401)
    else res.status(500).send(error)
  }
}

controllerComments.deleteComment = async (req, res) => {
  const t = await database.transaction()
  try {
    await Comments.destroy({
      where: {
        id: req.params.id
      }
    }, { transaction: t })
    await t.commit()
    res.sendStatus(201)
  } catch (error) {
    await t.rollback()
    console.error(error)
    res.status(500).send(error)
  }
}

controllerComments.getComment = async (req, res) => {
  try {
    const comment = await Comments.findByPk(req.params.id)
    res.status(200).json(comment)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
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
    res.status(500).send(error)
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
    res.status(500).send(error)
  }
}

export default controllerComments
