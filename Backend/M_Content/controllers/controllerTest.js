import { Images } from '../models/Image.js'
const controller = {}

controller.index = (req, res) => {
  const data = {
    name: 'john',
    surname: 'doe',
    phone: '12345678'
  }
  res.json(data)
}

controller.create = async (req, res) => {
  try {
    const image = await Images.create({
      name: 'test',
      userId: 3,
      proUser: false
    })
    res.status(201).json(image)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

export { controller }
