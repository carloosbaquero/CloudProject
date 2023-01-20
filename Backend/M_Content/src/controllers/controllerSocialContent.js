import SocialContent from '../models/SocialContent.js'
import { uploadFile, deleteFile, getPublicURL } from '../helpers/google.js'
import database from '../helpers/sequelize.js'
import { getUserAuthenticated, getUserById } from '../helpers/mUsers.js'
import { checkNameExtensionContent, requestType } from '../helpers/utilities.js'

const controllerSocialContent = {}

controllerSocialContent.indexSocialContents = async (req, res) => {
  try {
    const content = await SocialContent.findAll()
    res.status(200).json(content)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controllerSocialContent.indexSocialContentWithUser = async (req, res) => {
  try {
    const contents = await SocialContent.findAll()
    const result = []
    for (const content of contents) {
      const user = await getUserById(content.userId)
      const element = { ...user, ...content.dataValues }
      element.userName = user.name
      element.profilePublicURL = user.publicURL
      result.push(element)
    }
    result.sort()
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controllerSocialContent.indexImageContents = async (req, res) => {
  try {
    const images = await SocialContent.findAll({
      where: {
        contentType: 'image'
      }
    })
    res.status(200).json(images)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controllerSocialContent.indexVideoContents = async (req, res) => {
  try {
    const videos = await SocialContent.findAll({
      where: {
        contentType: 'video'
      }
    })
    res.status(200).json(videos)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controllerSocialContent.indexImageContentsUser = async (req, res) => {
  try {
    const result = await SocialContent.findAll({
      where: {
        contentType: 'image',
        userId: req.params.userId
      }
    })
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controllerSocialContent.indexVideoContentUser = async (req, res) => {
  try {
    const result = await SocialContent.findAll({
      where: {
        contentType: 'video',
        userId: req.params.userId
      }
    })
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controllerSocialContent.createImageContent = async (req, res) => {
  const data = req.body
  const t = await database.transaction()
  try {
    if (!data.name) throw new Error('Invalid fields')
    const user = await getUserAuthenticated(req.headers.authorization)
    const description = typeof data?.description === 'undefined'
      ? null
      : data.description
    const name = data.name
    if (typeof description !== 'string' || typeof name !== 'string') throw new Error('Invalid fields')
    if (!checkNameExtensionContent('image', name)) throw new Error('Incorrect extension')
    const imageContent = SocialContent.build({ transaction: t })
    imageContent.name = name
    imageContent.userId = user.id
    imageContent.description = description
    imageContent.contentType = 'image'
    await imageContent.save({ transaction: t })
    await t.commit()
    res.sendStatus(201)
  } catch (error) {
    await t.rollback()
    console.error(error)
    if (error.message === 'Invalid fields') res.sendStatus(401)
    else if (error.message === 'Incorrect extension') res.sendStatus(403)
    else res.status(500).send(error)
  }
}

controllerSocialContent.createVideoContent = async (req, res) => {
  const data = req.body
  const t = await database.transaction()
  try {
    if (!data.name) throw new Error('Invalid fields')
    const user = await getUserAuthenticated(req.headers.authorization)
    const description = typeof data?.description === 'undefined'
      ? null
      : data.description
    const name = data.name
    if (typeof description !== 'string' || typeof name !== 'string') throw (new Error('Invalid fields'))
    if (!checkNameExtensionContent('video', name)) throw new Error('Incorrect extension')
    const videoContent = SocialContent.build({ transaction: t })
    videoContent.name = name
    videoContent.userId = user.id
    videoContent.description = description
    videoContent.contentType = 'video'
    await videoContent.save({ transaction: t })
    await t.commit()
    res.sendStatus(201)
  } catch (error) {
    await t.rollback()
    console.error(error)
    if (error.message === 'Invalid fields') res.sendStatus(403)
    else if (error.message === 'Incorrect extension') res.sendStatus(401)
    else res.status(500).send(error)
  }
}
controllerSocialContent.updateContent = async (req, res) => {
  const t = await database.transaction()
  try {
    const data = req.body
    const user = await getUserAuthenticated(req.headers.authorization)
    const content = await SocialContent.findByPk(req.params.id)
    if (!content) throw new Error('Content not found')
    const check = content.userId === user.id
    if (!check) throw new Error('Invalid fields')
    if (typeof data?.description !== 'string') throw new Error('Invalid fields')
    await SocialContent.update(data, {
      where: {
        id: req.params.id
      },
      fields: ['description']
    }, { transaction: t })
    t.commit()
    res.sendStatus(204)
  } catch (error) {
    t.rollback()
    console.error(error)
    if (error.message === 'Content not found') res.sendStatus(404)
    else if (error.message === 'Invalid fields') res.sendStatus(403)
    else res.status(500).send(error)
  }
}

controllerSocialContent.deleteContent = async (req, res) => {
  const t = await database.transaction()
  try {
    await SocialContent.destroy({
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

controllerSocialContent.getContent = async (req, res) => {
  try {
    const image = await SocialContent.findByPk(req.params.id)
    res.status(200).json(image)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controllerSocialContent.saveContentFile = async (req, res) => {
  if (typeof req.files === 'undefined') res.status(401).send('The request must have an image to upload')
  else if (typeof req.files.newFile === 'undefined') res.status(401).send('The file to upload must be in the field called newFile')
  else {
    const t = await database.transaction()
    try {
      const contentName = req.files.newFile.name
      const type = requestType(req.url)
      const content = await SocialContent.findOne({
        where: {
          name: contentName
        }
      })
      if (!type.startsWith(content.contentType)) throw new Error('Invalid request')
      if (!content) throw new Error('Content not found')
      await uploadFile(req.files.newFile, type)
      const URL = getPublicURL(contentName, type)
      console.log(URL)
      await SocialContent.update({ publicURL: URL }, {
        where: {
          name: contentName
        },
        fields: ['publicURL']
      }, { transaction: t })
      await t.commit()
      res.sendStatus(201)
    } catch (error) {
      await t.rollback()
      console.error(error)
      if (error.message === 'Invalid request') res.sendStatus(403)
      else if (error.message === 'Content not found') res.sendStatus(404)
      else res.status(500).send(error)
    }
  }
}

controllerSocialContent.deleteContentFile = async (req, res) => {
  const t = await database.transaction()
  try {
    const content = await SocialContent.findByPk(req.params.id)
    const type = requestType(req.url)
    if (!type.startsWith(content.contentType)) throw new Error('Invalid request')
    if (!content) throw new Error('Not found')
    await deleteFile(content.dataValues.name, type)
    await SocialContent.update({ publicURL: null }, {
      where: {
        id: req.params.id
      },
      fields: ['publicURL']
    }, { transaction: t })
    await t.commit()
    res.sendStatus(201)
  } catch (error) {
    await t.rollback()
    console.error(error)
    if (error.message === 'Invalid request') res.sendStatus(403)
    else if (error.message === 'Not found') res.sendStatus(404)
    else res.status(500).send(error)
  }
}

controllerSocialContent.getPublicURLFile = async (req, res) => {
  try {
    const content = await SocialContent.findByPk(req.params.id)
    if (!content) throw new Error('Not found')
    const publicUrl = content.publicURL
    if (publicUrl === null) throw new Error('Not found')
    res.status(200).json({ URL: publicUrl })
  } catch (error) {
    console.error(error)
    if (error.message === 'Not found') res.sendStatus(404)
    else res.status(500).send(error)
  }
}

export default controllerSocialContent
