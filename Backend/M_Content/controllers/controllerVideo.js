import Videos from '../models/Video.js'
import { uploadFile, deleteFile, getFile } from '../helpers/Google.js'
const controllerVideos = {}

controllerVideos.indexVideos = async (req, res) => {
  try {
    const videos = await Videos.findAll()
    res.status(200).json(videos)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerVideos.createVideo = async (req, res) => {
  try {
    const video = Videos.build()
    const data = req.body
    video.name = data.name
    video.userId = Number(data?.userId)
    video.description = data?.description
    video.proUser = Boolean(data?.proUser)
    const result = await video.save()
    res.status(201).json(result)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerVideos.updateVideo = async (req, res) => {
  try {
    const data = req.body
    await Videos.update(data, {
      where: {
        id: req.params.id
      },
      fields: ['description']
    })
    const updateVideo = await Videos.findByPk(req.params.id)
    res.status(200).json(updateVideo)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerVideos.deleteVideo = async (req, res) => {
  try {
    const result = await Videos.destroy({
      where: {
        id: req.params.id
      }
    })
    let message
    if (result === 1) message = `Video with id = ${req.params.id} delete sucessfully.`
    else message = 'Could not delete video'
    res.status(200).json(message)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerVideos.getVideo = async (req, res) => {
  try {
    const video = await Videos.findByPk(req.params.id)
    res.status(200).json(video)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

controllerVideos.saveVideoFile = async (req, res) => {
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

controllerVideos.deleteVideoFile = async (req, res) => {
  try {
    const video = await Videos.findByPk(req.params.id)
    await deleteFile(video.dataValues.name, 'video')
    res.status(200).send('Success')
  } catch (error) {
    console.error(error)
    res.status(404).send(error)
  }
}

controllerVideos.getVideoFIle = async (req, res) => {
  res.send('Work in progress')
}

export default controllerVideos
