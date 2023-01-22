import SocialContent from '../models/SocialContent.js'
import { uploadFile, deleteFile, getPublicURL } from '../helpers/google.js'
import database from '../helpers/sequelize.js'
import { getUserAuthenticated, getUserById } from '../helpers/mUsers.js'
import { checkNameExtensionContent, requestType, sortContentWithUsers } from '../helpers/utilities.js'

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

controllerSocialContent.indexContentWithUser = async (req, res) => {
  try {
    const contents = await SocialContent.findAll()
    const result = []
    for (const content of contents) {
      const user = await getUserById(content.dataValues.userId)
      const element = { ...user, ...content.dataValues }
      element.userName = user.name
      element.profilePublicURL = user.publicURL
      result.push(element)
    }
    result.sort((a, b) => sortContentWithUsers(a, b))
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
    if (!data.name) throw new Error('Invalid fields, there is no name or types are incorrect')
    const user = await getUserAuthenticated(req.headers.authorization)
    const description = typeof data?.description === 'undefined'
      ? null
      : data.description
    const name = data.name
    if (typeof description !== 'string' || typeof name !== 'string') throw new Error('Invalid fields, there is no name or types are incorrect')
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
    if (error.message === 'Invalid fields, there is no name or types are incorrect') res.status(401).send('Invalid fields, there is no name or types are incorrect')
    else if (error.message === 'Incorrect extension') res.status(403).send('Incorrect extension')
    else res.status(500).send(error)
  }
}

controllerSocialContent.createVideoContent = async (req, res) => {
  const data = req.body
  const t = await database.transaction()
  try {
    if (!data.name) throw new Error('Invalid fields, there is no name or types are incorrect')
    const user = await getUserAuthenticated(req.headers.authorization)
    const description = typeof data?.description === 'undefined'
      ? null
      : data.description
    const name = data.name
    if (typeof description !== 'string' || typeof name !== 'string') throw (new Error('Invalid fields, there is no name or types are incorrect'))
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
    if (error.message === 'Invalid fields, there is no name or types are incorrect') res.status(403).send('Invalid fields, there is no name or types are incorrect')
    else if (error.message === 'Incorrect extension') res.status(401).send('Incorrect extension')
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
    if (!check) throw new Error('Invalid fields, the userId is wrong or description type is incorrect')
    if (typeof data?.description !== 'string') throw new Error('Invalid fields, the userId is wrong or description type is incorrect')
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
    if (error.message === 'Content not found') res.status(404).send('Content not found')
    else if (error.message === 'Invalid fields, the userId is wrong or description type is incorrect') res.status(403).send('Invalid fields, there userId is wrong or description type is incorrect')
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
    const content = await SocialContent.findByPk(req.params.id)
    if (!content) throw new Error('Content not found')
    const user = await getUserById(content.dataValues.userId)
    const result = { ...user, ...content.dataValues, userName: user.name, profileURL: user.publicURL }
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    if (error.message === 'Content not found') res.status(404).send(error)
    else res.status(500).send(error)
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
      if (!content) throw new Error('Content not found')
      if (!type.startsWith(content.contentType)) throw new Error('Invalid request')
      await uploadFile(req.files.newFile, type)
      const URL = getPublicURL(contentName, type)
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
      if (error.message === 'Invalid request') res.status(403).send('Invalid request')
      else if (error.message === 'Content not found') res.status(404).send('Content not found')
      else res.status(500).send(error)
    }
  }
}

controllerSocialContent.deleteContentFile = async (req, res) => {
  const t = await database.transaction()
  try {
    const content = await SocialContent.findByPk(req.params.id)
    const type = requestType(req.url)
    if (!content) throw new Error('Not found')
    if (!type.startsWith(content.contentType)) throw new Error('Invalid request')
    await deleteFile(content.dataValues.name, type)
    await SocialContent.update({ publicURL: null }, {
      where: {
        id: req.params.id
      },
      fields: ['publicURL']
    }, { transaction: t })
    await t.commit()
    res.sendStatus(204)
  } catch (error) {
    await t.rollback()
    console.error(error)
    if (error.message === 'Invalid request') res.status(403).send('Invalid request')
    else if (error.message === 'Not found') res.status(404).send('Not found')
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
    if (error.message === 'Not found') res.status(404).send('Not found')
    else res.status(500).send(error)
  }
}

export default controllerSocialContent
