import Comments from '../models/Comment.js'
import SocialContent from '../models/SocialContent.js'
import database from '../helpers/sequelize.js'
import { getUserAuthenticated } from '../helpers/mUsers.js'

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
    const contentId = data?.contentId
    const text = data?.text
    if (typeof text !== 'string') throw new Error('Fields missing')
    if (typeof contentId !== 'number') throw new Error('Comment must belong to one image or video')
    const user = await getUserAuthenticated(req.headers.authorization)
    const content = await SocialContent.findByPk(contentId)
    if (!content) throw new Error('Content not found')
    const comment = Comments.build({ transaction: t })
    comment.contentId = contentId
    comment.text = text
    comment.userId = user.id
    await comment.save({ transaction: t })
    await t.commit()
    res.sendStatus(201)
  } catch (error) {
    await t.rollback()
    console.error(error)
    if (error.message === 'Fields missing') res.status(401).send('Fields missing')
    else if (error.message === 'Content not found') res.status(404).send('Content not found')
    else if (error.message === 'Comment must belong to one image or video') res.status(403).send('Comment must belong to one image or video')
    else res.status(500).send(error)
  }
}

controllerComments.updateComment = async (req, res) => {
  const data = req.body
  const t = await database.transaction()
  try {
    const newText = data?.text
    if (typeof newText !== 'string') throw new Error('Missing fields')
    await Comments.update({ text: newText }, {
      where: {
        id: req.params.id
      },
      fields: ['text']
    }, { transaction: t })
    await t.commit()
    res.sendStatus(204)
  } catch (error) {
    await t.rollback()
    console.error(error)
    if (error.message === 'Missing fields') res.status(401).send('Missing fields')
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
    res.sendStatus(204)
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

controllerComments.getCommentsContent = async (req, res) => {
  try {
    const comments = await Comments.findAll({
      where: {
        contentId: req.params.contentId
      }
    })
    res.status(200).json(comments)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

export default controllerComments
