import SocialContent from '../models/SocialContent.js'
// eslint-disable-next-line no-unused-vars
import { uploadFile, deleteFile, getFile } from '../helpers/Google.js'
const controllerSocialContent = {}

controllerSocialContent.indexSocialContents = async (req, res) => {
  try {
    const images = await SocialContent.findAll()
    res.status(200).json(images)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
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
    res.status(400).send(error)
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
    res.status(400).send(error)
  }
}

controllerSocialContent.createImageContent = async (req, res) => {
  try {
    const imageContent = SocialContent.build()
    const data = req.body
    imageContent.name = data.name
    imageContent.userId = Number(data?.userId)
    imageContent.description = data?.description
    imageContent.proUser = Boolean(data?.proUser)
    imageContent.contentType = 'image'
    const result = await imageContent.save()
    res.status(201).json(result)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerSocialContent.createVideoContent = async (req, res) => {
  try {
    const videoContent = SocialContent.build()
    const data = req.body
    videoContent.name = data.name
    videoContent.userId = Number(data?.userId)
    videoContent.description = data?.description
    videoContent.proUser = Boolean(data?.proUser)
    videoContent.contentType = 'video'
    const result = await videoContent.save()
    res.status(201).json(result)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}
controllerSocialContent.updateContent = async (req, res) => {
  try {
    const data = req.body
    await SocialContent.update(data, {
      where: {
        id: req.params.id
      },
      fields: ['description']
    })
    const updateImage = await SocialContent.findByPk(req.params.id)
    res.status(200).json(updateImage)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerSocialContent.deleteContent = async (req, res) => {
  try {
    const result = await SocialContent.destroy({
      where: {
        id: req.params.id
      }
    })
    let message
    if (result === 1) message = `File with id = ${req.params.id} delete sucessfully.`
    else message = 'Could not delete file'
    res.status(200).json(message)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerSocialContent.getContent = async (req, res) => {
  try {
    const image = await SocialContent.findByPk(req.params.id)
    res.status(200).json(image)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerSocialContent.saveImageContentFile = async (req, res) => {
  if (typeof req.files === 'undefined') res.status(400).send('The request must have an image to upload')
  else if (typeof req.files.image === 'undefined') res.status(400).send('The file to upload must be in the field called image')
  else {
    try {
      await uploadFile(req.files.image, 'images')
      res.status(201).send('Success')
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

controllerSocialContent.saveVideoContentFile = async (req, res) => {
  if (typeof req.files === 'undefined') res.status(400).send('The request must have an video to upload')
  else if (typeof req.files.video === 'undefined') res.status(400).send('The file to upload must be in the field called video')
  else {
    try {
      await uploadFile(req.files.video, 'videos')
      res.status(201).send('Success')
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

controllerSocialContent.deleteContentImageFile = async (req, res) => {
  try {
    const content = await SocialContent.findByPk(req.params.id)
    await deleteFile(content.dataValues.name, 'images')
    res.status(200).send('Success')
  } catch (error) {
    console.error(error)
    res.status(404).send(error)
  }
}

controllerSocialContent.deleteContentVideoFile = async (req, res) => {
  try {
    const content = await SocialContent.findByPk(req.params.id)
    await deleteFile(content.dataValues.name, 'video')
    res.status(200).send('Success')
  } catch (error) {
    console.error(error)
    res.status(404).send(error)
  }
}

controllerSocialContent.getContentImageFile = async (req, res) => {
/*   try {
    const image = await Images.findByPk(req.params.id)
    await getFile(image.dataValues.name, 'images')
    res.status(200).send('Success')
  } catch (error) {
    console.error(error)
    res.status(404).send(error)
  } */
  res.send('Work in process')
}

controllerSocialContent.getContentVideoFile = async (req, res) => {
/*   try {
    const image = await Images.findByPk(req.params.id)
    await getFile(image.dataValues.name, 'images')
    res.status(200).send('Success')
  } catch (error) {
    console.error(error)
    res.status(404).send(error)
  } */
  res.send('Work in process')
}

export default controllerSocialContent
