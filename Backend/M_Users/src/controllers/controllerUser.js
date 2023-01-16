import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import User from '../models/User.js'
import database from '../helpers/sequelize.js'
import { REFRESH_TOKEN_SECRET } from '../config.js'
import generateAccessToken from '../helpers/authorization.js'

const controllerUser = {}

controllerUser.getUser = async (req, res) => {
  try {
    const users = await User.findOne({
      where: {
        name: req.user.name
      },
      attributes: ['name']
    })
    res.status(200).send(users)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controllerUser.createUser = async (req, res) => {
  const data = req.body
  if (!(data.name && data.password)) {
    res.status(401).send({ error: 'Data not formatted properly' })
  }
  const t = await database.transaction()
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const newUser = User.build({ transaction: t })
    newUser.name = data.name
    newUser.password = hashedPassword
    await newUser.save()
    await t.commit()
    res.status(201).send()
  } catch (error) {
    await t.rollback()
    console.error(error)
    res.status(500).send(error)
  }
}

controllerUser.logIn = async (req, res) => {
  const data = req.body
  if (!(data.name && data.password)) {
    res.status(401).send({ error: 'Data not formatted properly' })
  } else {
    const t = await database.transaction()
    try {
      const user = await User.findOne({
        where: {
          name: data.name
        }
      })
      if (!user) throw (new Error(`User ${data.name} don't exist`))
      const validation = await bcrypt.compare(data.password, user.password)
      if (!validation) throw (new Error('Invalid password'))
      const newAccessToken = generateAccessToken({ name: user.name })
      const newRefreshToken = jsonwebtoken.sign({ name: user.name }, REFRESH_TOKEN_SECRET)
      await User.update({ refreshToken: newRefreshToken }, {
        where: {
          id: user.id
        },
        fields: ['refreshToken']
      }, { transaction: t })
      await t.commit()
      res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken })
    } catch (error) {
      await t.rollback()
      console.error(error)
      if (error.message === 'Invalid password') res.status(403).send({ error: 'Invalid password' })
      else if (error.message === `User ${data.name} don't exist`) res.status(400).send({ error: `User ${data.name} don't exist` })
      else res.status(500).send(error)
    }
  }
}
// NECESITO EL TOKEN Y EL NAME EN EL BODY
controllerUser.token = async (req, res) => {
  const data = req.body
  const refreshToken = data.token
  if (typeof refreshToken === 'undefined' || refreshToken === null) res.sendStatus(401)
  try {
    const user = await User.findOne({
      where: {
        name: data.name
      }
    })
    if (!user || user.refreshToken === null) throw (new Error('Forbiden'))
    jsonwebtoken.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ name: user.name })
      res.status(200).json(accessToken)
    })
  } catch (error) {
    console.error(error)
    if (error.message === 'Forbiden') res.sendStatus(403)
    else res.status(500).send(error)
  }
}

controllerUser.logOut = async (req, res) => {
  const t = await database.transaction()
  const data = req.body
  if (typeof data.name === 'undefined' || data.name === null) res.sendStatus(401)
  try {
    await User.update({ refreshToken: null }, {
      where: {
        name: data.name
      },
      fields: ['refreshToken']
    }, { transaction: t })
    await t.commit()
    res.sendStatus(201)
  } catch (error) {
    await t.rollback()
    console.error(error)
    res.status(500).send(error)
  }
}

export default controllerUser
