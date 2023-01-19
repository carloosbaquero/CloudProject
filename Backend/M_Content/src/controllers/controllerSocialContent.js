import SocialContent from '../models/SocialContent.js'
import { uploadFile, deleteFile, getPublicURL } from '../helpers/google.js'
import database from '../helpers/sequelize.js'
import { getUserAuthenticated } from '../helpers/mUsers.js'
import { checkNameExtensionContent } from '../helpers/utilities.js'

const controllerSocialContent = {}

controllerSocialContent.indexSocialContents = async (req, res) => {
  try {
    const images = await SocialContent.findAll()
    res.status(200).json(images)
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
    const images = await SocialContent.findAll({
      where: {
        contentType: 'video'
      }
    })
    res.status(200).json(images)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controllerSocialContent.createImageContent = async (req, res) => {
  const data = req.body
  const t = await database.transaction()
  try {
    if (!data.name) throw new Error('Missing fields')
    const user = await getUserAuthenticated(req.headers.authorization)
    const description = typeof data?.description === 'undefined'
      ? null
      : data.description
    const name = data.name
    if (typeof description !== 'string' || typeof name !== 'string') throw new Error('Invalid fields')
    if (!checkNameExtensionContent('image', name)) throw new Error('Invalid fields')
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
    if (error.message === 'Missing fields') res.sendStatus(401)
    else if (error.message === 'Invalid fields') res.sendStatus(403)
    else res.status(500).send(error)
  }
}

controllerSocialContent.createVideoContent = async (req, res) => {
  const data = req.body
  const t = await database.transaction()
  try {
    if (!data.name) throw new Error('Missing fields')
    const user = await getUserAuthenticated(req.headers.authorization)
    const description = typeof data?.description === 'undefined'
      ? null
      : data.description
    const name = data.name
    if (typeof description !== 'string' || typeof name !== 'string') throw (new Error('Invalid fields'))
    if (!checkNameExtensionContent('video', name)) throw new Error('Invalid fields')
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
    if (error.message === 'Missing fields') res.sendStatus(401)
    else if (error.message === 'Invalid fields') res.sendStatus(403)
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
    if (!check) throw new Error('User dont owe content')
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
    else if (error.message === 'User dont owe content') res.sendStatus(403)
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

controllerSocialContent.saveImageContentFile = async (req, res) => {
  if (typeof req.files === 'undefined') res.status(401).send('The request must have an image to upload')
  else if (typeof req.files.image === 'undefined') res.status(401).send('The file to upload must be in the field called image')
  else {
    const t = await database.transaction()
    try {
      const imageName = req.files.image.name
      const imageContent = await SocialContent.findOne({
        where: {
          name: imageName
        }
      })
      if (!imageContent) throw new Error('Image not found')
      await uploadFile(req.files.image, 'images')
      const URL = getPublicURL(imageName, 'images')
      await SocialContent.update({ publicURL: URL }, {
        where: {
          name: imageName
        },
        fields: ['publicURL']
      }, { transaction: t })
      await t.commit()
      res.sendStatus(201)
    } catch (error) {
      await t.rollback()
      console.error(error)
      if (error.message !== 'Image not found') res.sendStatus(404)
      else res.status(500).send(error)
    }
  }
}

controllerSocialContent.saveVideoContentFile = async (req, res) => {
  if (typeof req.files === 'undefined') res.status(401).send('The request must have an video to upload')
  else if (typeof req.files.video === 'undefined') res.status(401).send('The file to upload must be in the field called video')
  else {
    const t = await database.transaction()
    try {
      const videoName = req.files.video.name
      const videoContent = await SocialContent.findOne({
        where: {
          name: videoName
        }
      })
      if (!videoContent) throw new Error('Image not found')
      await uploadFile(req.files.video, 'videos')
      const URL = getPublicURL(videoName, 'videos')
      await SocialContent.update({ publicURL: URL }, {
        where: {
          name: videoName
        },
        fields: ['publicURL']
      }, { transaction: t })
      await t.commit()
      res.senStatus(201)
    } catch (error) {
      await t.rollback()
      console.error(error)
      if (error.message !== 'Image not found') res.sendStatus(404)
      else res.status(500).send(error)
    }
  }
}

controllerSocialContent.deleteContentImageFile = async (req, res) => {
  const t = await database.transaction()
  try {
    const content = await SocialContent.findByPk(req.params.id)
    if (!content) throw new Error('Not found')
    await deleteFile(content.dataValues.name, 'images')
    await SocialContent.update({ publicURL: null }, {
      where: {
        id: req.params.id
      },
      fields: ['publicURL']
    }, { transaction: t })
    await t.commit()
    res.status(201)
  } catch (error) {
    await t.rollback()
    console.error(error)
    if (error.message === 'Not found') res.sendStatus(404)
    else res.status(500).send(error)
  }
}

controllerSocialContent.deleteContentVideoFile = async (req, res) => {
  const t = await database.transaction()
  try {
    const content = await SocialContent.findByPk(req.params.id)
    if (!content) throw new Error('Not found')
    await deleteFile(content.dataValues.name, 'video')
    await SocialContent.update({ publicURL: null }, {
      where: {
        id: req.params.id
      },
      fields: ['publicURL']
    }, { transaction: t })
    await t.commit()
    res.status(201)
  } catch (error) {
    await t.rollback()
    console.error(error)
    if (error.message === 'Not found') res.sendStatus(404)
    else res.status(500).send(error)
  }
}

controllerSocialContent.getPublicURLImageFile = async (req, res) => {
  try {
    const image = await SocialContent.findByPk(req.params.id)
    if (!image) throw new Error('Not found')
    const publicUrl = image.publicURL
    if (publicUrl === null) throw new Error('Not found')
    res.status(200).json({ URL: publicUrl })
  } catch (error) {
    console.error(error)
    if (error.message === 'Not found') res.sendStatus(404)
    else res.status(500).send(error)
  }
}

controllerSocialContent.getPublicURLVideoFile = async (req, res) => {
  try {
    const video = await SocialContent.findByPk(req.params.id)
    if (!video) throw new Error('Not found')
    const publicUrl = video.publicURL
    if (publicUrl === null) throw new Error('Not found')
    res.status(200).json({ URL: publicUrl })
  } catch (error) {
    console.error(error)
    if (error.message === 'Not found') res.sendStatus(404)
    else res.status(500).send(error)
  }
}

export default controllerSocialContent
