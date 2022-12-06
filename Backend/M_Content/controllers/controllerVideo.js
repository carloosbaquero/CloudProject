import { Videos } from '../models/Video.js'
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

controllerVideos.saveVideoFile = (req, res) => {
  res.send('Work in progress!!')
}

controllerVideos.deleteVideoFile = (req, res) => {
  res.send('Work in progress!!')
}

export { controllerVideos }
