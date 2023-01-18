import SocialContent from '../models/SocialContent.js'
import { uploadFile, deleteFile, getPublicURL } from '../helpers/google.js'
import database from '../helpers/sequelize.js'
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
    if (!(data.name && data.userId)) throw (new Error('Missing fields'))
    const imageContent = SocialContent.build({ transaction: t })
    imageContent.name = data.name
    imageContent.userId = Number(data.userId)
    imageContent.description = typeof data?.description === 'undefined' ? null : data.description
    imageContent.contentType = 'image'
    await imageContent.save({ transaction: t })
    await t.commit()
    res.sendStatus(201)
  } catch (error) {
    await t.rollback()
    console.error(error)
    if (error.message === 'Missing fields') res.sendStatus(401)
    else res.status(500).send(error)
  }
}

controllerSocialContent.createVideoContent = async (req, res) => {
  const data = req.body
  const t = await database.transaction()
  try {
    if (!(data.name && data.userId)) throw (new Error('Missing fields'))
    const videoContent = SocialContent.build({ transaction: t })
    videoContent.name = data.name
    videoContent.userId = Number(data.userId)
    videoContent.description = typeof data?.description === 'undefined' ? null : data.description
    videoContent.contentType = 'video'
    const result = await videoContent.save({ transaction: t })
    await t.commit()
    res.status(201).json(result)
  } catch (error) {
    await t.rollback()
    console.error(error)
    if (error.message === 'Missing fields') res.sendStatus(401)
    else res.status(500).send(error)
  }
}
controllerSocialContent.updateContent = async (req, res) => {
  const t = await database.transaction()
  try {
    const data = req.body
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
    res.status(500).send(error)
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
      await uploadFile(req.files.image, 'images')
      const imageName = req.files.image.name
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
      res.status(500).send(error)
    }
  }
}

controllerSocialContent.saveVideoContentFile = async (req, res) => {
  if (typeof req.files === 'undefined') res.status(401).send('The request must have an video to upload')
  else if (typeof req.files.video === 'undefined') res.status(401).send('The file to upload must be in the field called video')
  else {
    const t = await database.transaction()
    try {
      await uploadFile(req.files.video, 'videos')
      const videoName = req.files.video.name
      const URL = getPublicURL(videoName, 'videos')
      await SocialContent.update({ publicURL: URL }, {
        where: {
          name: videoName
        },
        fields: ['publicURL']
      }, { transaction: t })
      await t.commit()
      res.status(201).send('Success')
    } catch (error) {
      await t.rollback()
      console.error(error)
      res.status(500).send(error)
    }
  }
}

controllerSocialContent.deleteContentImageFile = async (req, res) => {
  const t = await database.transaction()
  try {
    const content = await SocialContent.findByPk(req.params.id)
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
    res.status(500).send(error)
  }
}

controllerSocialContent.deleteContentVideoFile = async (req, res) => {
  const t = await database.transaction()
  try {
    const content = await SocialContent.findByPk(req.params.id)
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
    res.status(500).send(error)
  }
}

controllerSocialContent.getPublicURLImageFile = async (req, res) => {
  try {
    const image = await SocialContent.findByPk(req.params.id)
    const publicUrl = getPublicURL(image.dataValues.name, 'images')
    res.status(200).send(publicUrl)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controllerSocialContent.getPublicURLVideoFile = async (req, res) => {
  try {
    const video = await SocialContent.findByPk(req.params.id)
    const publicUrl = getPublicURL(video.dataValues.name, 'videos')
    res.status(200).send(publicUrl)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

export default controllerSocialContent
