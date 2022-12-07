import { Images } from '../models/Image.js'
import { uploadFile, deleteFile, getFile } from '../helpers/Google.js'
const controllerImages = {}

controllerImages.indexImages = async (req, res) => {
  try {
    const images = await Images.findAll()
    res.status(200).json(images)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerImages.createImage = async (req, res) => {
  try {
    const image = Images.build()
    const data = req.body
    image.name = data.name
    image.userId = Number(data?.userId)
    image.description = data?.description
    image.proUser = Boolean(data?.proUser)
    const result = await image.save()
    res.status(201).json(result)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerImages.updateImage = async (req, res) => {
  try {
    const data = req.body
    await Images.update(data, {
      where: {
        id: req.params.id
      },
      fields: ['description']
    })
    const updateImage = await Images.findByPk(req.params.id)
    res.status(200).json(updateImage)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerImages.deleteImage = async (req, res) => {
  try {
    const result = await Images.destroy({
      where: {
        id: req.params.id
      }
    })
    let message
    if (result === 1) message = `Image with id = ${req.params.id} delete sucessfully.`
    else message = 'Could not delete image'
    res.status(200).json(message)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerImages.getImage = async (req, res) => {
  try {
    const image = await Images.findByPk(req.params.id)
    res.status(200).json(image)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerImages.saveImageFile = async (req, res) => {
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

controllerImages.deleteImageFile = async (req, res) => {
  try {
    const image = await Images.findByPk(req.params.id)
    await deleteFile(image.dataValues.name, 'images')
    res.status(200).send('Success')
  } catch (error) {
    console.error(error)
    res.status(404).send(error)
  }
}

controllerImages.getImageFile = async (req, res) => {
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

export { controllerImages }
