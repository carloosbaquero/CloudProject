import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import datefns from 'date-fns'
import User from '../models/User.js'
import database from '../helpers/sequelize.js'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config.js'
import generateAccessToken from '../helpers/authorization.js'
import { deleteFile, getPublicURL, uploadFile } from '../helpers/google.js'

const controllerUser = {}

controllerUser.getUserAuthenticated = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        name: req.user.name
      },
      attributes: ['id', 'name', 'email', 'publicURL', 'profilePicture', 'proUser']
    })
    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controllerUser.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'publicURL', 'profilePicture', 'proUser']
    })
    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controllerUser.createUser = async (req, res) => {
  const data = req.body
  const t = await database.transaction()
  try {
    if (typeof data?.name !== 'string' || typeof data?.email !== 'string' || typeof data?.password !== 'string') {
      throw (new Error('Name or email or password types are incorrect'))
    }
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const newUser = User.build({ transaction: t })
    newUser.proUser = false
    newUser.name = data.name
    newUser.email = data.email
    newUser.password = hashedPassword
    await newUser.save({ transaction: t })
    await t.commit()
    res.sendStatus(201)
  } catch (error) {
    await t.rollback()
    console.error(error)
    if (error.message === 'Name or email or password types are incorrect') res.status(401).send('Name or email or password types are incorrect')
    else res.status(500).send(error)
  }
}

controllerUser.updateUserToPro = async (req, res) => {
  const data = req.body
  const t = await database.transaction()
  try {
    if (typeof data?.numMonths !== 'number') throw (new Error('numMonths type is wrong'))
    const numMonths = data.numMonths
    if (numMonths <= 0) throw (new Error('numMonths is incorrect'))
    await User.update({ proUser: true, proDate: Date.now(), numMonthsPro: numMonths }, {
      where: {
        name: req.user.name
      },
      fields: ['proUser', 'proDate', 'numMonthsPro']
    }, { transaction: t })
    await t.commit()
    res.sendStatus(204)
  } catch (error) {
    await t.rollback()
    console.error(error)
    if (error.message === 'numMonths type is wrong') res.status(401).send('numMonths type is wrong')
    else if (error.message === 'numMonths is incorrect') res.status(404).send('numMonths is incorrect')
    else res.status(500).send(error)
  }
}

controllerUser.checkProStatus = async (req, res) => {
  const t = await database.transaction()
  try {
    const now = Date.now()
    const user = await User.findOne({
      where: {
        name: req.user.name
      },
      attributes: ['proUser', 'proDate', 'numMonthsPro']
    })
    if (!user.dataValues.proUser) throw new Error('User is not pro')
    const userProDate = user.dataValues.proDate
    const userNumMonthsPro = user.dataValues.numMonthsPro
    const limitDate = datefns.addMonths(userProDate, userNumMonthsPro)
    const check = datefns.isBefore(now, limitDate)
    if (!check) {
      await User.update({ proUser: false, proDate: null, numMonthsPro: null }, {
        where: {
          name: req.user.name
        },
        fields: ['proUser', 'proDate', 'numMontsPro']
      }, { transaction: t })
      t.commit()
      res.status(200).send('User is no longer pro')
    } else {
      res.status(200).send('User is still pro')
    }
  } catch (error) {
    await t.rollback()
    console.error(error)
    if (error.message === 'User is not pro') res.status(401).send('User is not pro')
    else res.status(500).send(error)
  }
}

controllerUser.updateUserAuthenticated = async (req, res) => {
  const t = await database.transaction()
  const newEmail = req.body?.email
  try {
    if (typeof newEmail !== 'string') throw new Error('Email type is wrong')
    await User.update({ email: newEmail }, {
      where: {
        name: req.user.name
      },
      fields: ['email']
    }, { transaction: t })
    await t.commit()
    res.sendStatus(204)
  } catch (error) {
    await t.rollback()
    console.error(error)
    if (error.message === 'Email type is wrong') res.status(401).send('Email type is wrong')
    else res.status(500).send(error)
  }
}

controllerUser.deleteUserAuthenticated = async (req, res) => {
  const t = await database.transaction()
  try {
    await User.destroy({
      where: {
        name: req.user.name
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

controllerUser.deleteUserById = async (req, res) => {
  const t = await database.transaction()
  try {
    await User.destroy({
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

controllerUser.saveProfileImageFile = async (req, res) => {
  if (typeof req.files === 'undefined') res.status(400).send('The request must have an image to upload')
  else if (typeof req.files.newFile === 'undefined') res.status(400).send('The file to upload must be in the field called image')
  else {
    const t = await database.transaction()
    try {
      const fileName = `${req.user.name}-${req.files.newFile.name}`
      await uploadFile(req.files.newFile, fileName)
      const urlProfilePicture = getPublicURL(fileName)
      await User.update({ publicURL: urlProfilePicture, profilePicture: fileName }, {
        where: {
          name: req.user.name
        },
        fields: ['publicURL', 'profilePicture']
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

controllerUser.updateProfileImageFile = async (req, res) => {
  if (typeof req.files === 'undefined') res.status(400).send('The request must have an image to upload')
  else if (typeof req.files.newFile === 'undefined') res.status(400).send('The file to upload must be in the field called image')
  else {
    const t = await database.transaction()
    try {
      const user = await User.findOne({
        where: {
          name: req.user.name
        },
        attributes: ['profilePicture']
      })
      const oldFileName = user.dataValues.profilePicture
      const newFileName = `${req.user.name}-${req.files.newFile.name}`
      await deleteFile(oldFileName)
      await uploadFile(req.files.newFile, newFileName)
      const urlProfilePicture = getPublicURL(newFileName)
      await User.update({ publicURL: urlProfilePicture, profilePicture: newFileName }, {
        where: {
          name: req.user.name
        },
        fields: ['publicURL', 'profilePicture']
      }, { transaction: t })
      await t.commit()
      res.sendStatus(204)
    } catch (error) {
      await t.rollback()
      console.error(error)
      res.status(500).send(error)
    }
  }
}

controllerUser.deleteProfileImageFile = async (req, res) => {
  const t = await database.transaction()
  try {
    const user = await User.findOne({
      where: {
        name: req.user.name
      },
      attributes: ['profilePicture']
    })
    const fileName = user.dataValues.profilePicture
    await deleteFile(fileName)
    await User.update({ publicURL: null, profilePicture: null }, {
      where: {
        name: req.user.name
      },
      fields: ['publicURL', 'profilePicture']
    }, { transaction: t })
    await t.commit()
    res.sendStatus(204)
  } catch (error) {
    await t.rollback()
    console.error(error)
    res.status(500).send(error)
  }
}

controllerUser.logIn = async (req, res) => {
  const data = req.body
  const t = await database.transaction()
  try {
    if (!(data.name && data.password)) throw new Error('Name or password types are wrong')
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
    if (error.message === 'Invalid password') res.status(403).send('Invalid password')
    else if (error.message === 'Name or password types are wrong') res.status(401).send('Name or password types are wrong')
    else if (error.message === `User ${data.name} don't exist`) res.status(404).send(`User ${data.name} don't exist`)
    else res.status(500).send(error)
  }
}

controllerUser.token = async (req, res) => {
  const data = req.body
  const refreshToken = data?.refreshToken
  const accessToken = data?.accessToken
  const userName = data?.name
  try {
    if (typeof refreshToken !== 'string' || typeof accessToken !== 'string' || typeof userName !== 'string') throw new Error('Input values types are wrong')
    const user = await User.findOne({
      where: {
        name: userName
      }
    })
    if (!user || user.refreshToken === null) throw new Error('User or refreshToken not found')
    jsonwebtoken.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) throw new Error('RefreshToken invalid')
    })
    jsonwebtoken.verify(accessToken, ACCESS_TOKEN_SECRET)
    res.status(200).json({ expired: false, token: null, name: req.body.name })
  } catch (error) {
    if (error.message !== 'Token valid') console.error(error)
    switch (error.message) {
      case 'jwt expired':
        // eslint-disable-next-line no-case-declarations
        const accessToken = generateAccessToken({ name: userName })
        res.status(200).json({ expired: true, token: accessToken, name: userName })
        break
      case 'invalid signature':
        res.status(403).send('Token invalid')
        break
      case 'RefreshToken invalid':
        res.status(403).send('RefreshToken invalid')
        break
      case 'Input values types are wrong':
        res.status(401).send('Input values types are wrong')
        break
      case 'User or refreshToken not found':
        res.status(404).send('User or refreshToken not found')
        break
      default:
        res.status(500).send(error)
    }
  }
}

controllerUser.logOut = async (req, res) => {
  const t = await database.transaction()
  try {
    await User.update({ refreshToken: null }, {
      where: {
        name: req.user.name
      },
      fields: ['refreshToken']
    }, { transaction: t })
    await t.commit()
    res.sendStatus(204)
  } catch (error) {
    await t.rollback()
    console.error(error)
    res.status(500).send(error)
  }
}

export default controllerUser
