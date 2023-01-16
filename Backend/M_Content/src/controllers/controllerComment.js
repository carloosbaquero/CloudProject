import Comments from '../models/Comment.js'
import database from '../helpers/sequelize.js'

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
  const t = await database.transaction()
  try {
    const comment = Comments.build({ transaction: t })
    const data = req.body
    comment.text = data.text
    comment.userId = Number(data.userId)
    comment.imageId = Number(data?.imageId)
    comment.videoId = Number(data?.videoId)
    const result = await comment.save({ transaction: t })
    await t.commit()
    res.status(201).json(result)
  } catch (error) {
    await t.rollback()
    console.error(error)
    res.status(400).send(error)
  }
}

controllerComments.updateComment = async (req, res) => {
  const t = await database.transaction()
  try {
    const data = req.body
    await Comments.update(data, {
      where: {
        id: req.params.id
      },
      fields: ['text']
    }, { transaction: t })
    const updateComment = await Comments.findByPk(req.params.id, { transaction: t })
    await t.commit()
    res.status(200).json(updateComment)
  } catch (error) {
    await t.rollback()
    console.error(error)
    res.status(400).send(error)
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
