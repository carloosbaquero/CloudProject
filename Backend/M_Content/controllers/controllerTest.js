const controller = {}

controller.index = (req, res) => {
  const data = {
    name: 'john',
    surname: 'doe',
    phone: '12345678'
  }
  res.json(data)
}

export { controller }
