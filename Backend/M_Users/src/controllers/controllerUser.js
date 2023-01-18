import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import datefns from 'date-fns'
import User from '../models/User.js'
import database from '../helpers/sequelize.js'
import { REFRESH_TOKEN_SECRET } from '../config.js'
import generateAccessToken from '../helpers/authorization.js'
import { deleteFile, getPublicURL, uploadFile } from '../helpers/google.js'

const controllerUser = {}

controllerUser.getUserAuthenticated = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        name: req.user.name
      },
      attributes: ['id', 'name', 'email', 'publicUrl', 'profilePicture']
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
      attributes: ['id', 'name', 'email', 'publicUrl', 'profilePicture']
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
    if (!(data.name && data.password && data.email)) {
      throw (new Error('Fail first check'))
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
    if (error.message === 'Fail first check') res.sendStatus(401)
    else res.status(500).send(error)
  }
}

controllerUser.updateUserToPro = async (req, res) => {
  const data = req.body
  const t = await database.transaction()
  try {
    if (!data.numMonths) throw (new Error('Fields missing'))
    const numMonths = Number(data.numMonths)
    if (numMonths <= 0) throw (new Error('Incorrect field'))
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
    if (error.message === 'Fields missing') res.sendStatus(401)
    else if (error.message === 'Incorrect field') res.sendStatus(404)
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
      attributes: ['proDate', 'numMonthsPro']
    })
    const limitDate = datefns.addMonths(user.proDate, user.numMonthsPro)
    const check = datefns.isBefore(now, limitDate)
    if (!check) {
      await User.update({ proUser: false, proDate: null, numMonthsPro: null }, {
        where: {
          name: req.user.name
        },
        fields: ['proUser', 'proDate', 'numMontsPro']
      }, { transaction: t })
      await t.commit()
      res.sendStatus(201)
    } else {
      await t.commit()
      res.senStatus(200)
    }
  } catch (error) {
    await t.rollback()
    console.error(error)
    res.status(500).send(error)
  }
}

controllerUser.updateUserAuthenticated = async (req, res) => {
  const t = await database.transaction()
  let newName = req.body?.name
  let newEmail = req.body?.email
  try {
    const user = await User.findOne({
      where: {
        name: req.user.name
      },
      attributes: ['name', 'email']
    })
    if (typeof newName === 'undefined') newName = user.name
    if (typeof newEmail === 'undefined') newEmail = user.email
    await User.update({ name: newName, email: newEmail }, {
      where: {
        name: req.user.name
      },
      fields: ['name', 'email']
    }, { transaction: t })
    await t.commit()
    res.sendStatus(204)
  } catch (error) {
    await t.rollback()
    console.error(error)
    res.status(500).send(error)
  }
}
controllerUser.updateProfileImageFile = async (req, res) => {
  if (typeof req.files === 'undefined') res.status(400).send('The request must have an image to upload')
  else if (typeof req.files.image === 'undefined') res.status(400).send('The file to upload must be in the field called image')
  else {
    const t = await database.transaction()
    try {
      const user = await User.findOne({
        where: {
          name: req.user.name
        },
        attributes: ['profilePicture']
      })
      const oldFileName = user.profilePicture
      const newFileName = `${req.user.name}.${req.files.image.name.split('.').pop()}`
      await deleteFile(oldFileName)
      await uploadFile(req.files.image, newFileName)
      const urlProfilePicture = getPublicURL(newFileName)
      await User.update({ publicUrl: urlProfilePicture, profilePicture: newFileName }, {
        where: {
          name: req.user.name
        },
        fields: ['publicUrl', 'profilePicture']
      }, { transaction: t })
      await t.commit()
      res.status(200).send('Profile picture updated')
    } catch (error) {
      await t.rollback()
      console.error(error)
      res.status(500).send(error)
    }
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
  else if (typeof req.files.image === 'undefined') res.status(400).send('The file to upload must be in the field called image')
  else {
    const t = await database.transaction()
    try {
      const fileName = `${req.user.name}.${req.files.image.name.split('.').pop()}`
      await uploadFile(req.files.image, fileName)
      const urlProfilePicture = getPublicURL(fileName)
      await User.update({ publicUrl: urlProfilePicture, profilePicture: fileName }, {
        where: {
          name: req.user.name
        },
        fields: ['publicUrl', 'profilePicture']
      }, { transaction: t })
      await t.commit()
      res.status(200).send('Profile picture updated')
    } catch (error) {
      await t.rollback()
      console.error(error)
      res.status(500).send(error)
    }
  }
}
// NO ELIMINA LOS ARCHIVOS QUE ESTAN GUARDADOS EN GOOGLE CLOUD
controllerUser.deleteProfileImageFile = async (req, res) => {
  const t = await database.transaction()
  try {
    const user = await User.findOne({
      where: {
        name: req.user.name
      },
      attributes: ['ProfilePicture']
    })
    const fileName = user.profilePicture
    console.log(fileName)
    await deleteFile(fileName)
    await User.update({ publicUrl: null, profilePicture: null }, {
      where: {
        name: req.user.name
      },
      fields: ['publicUrl', 'profilePicture']
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
  if (!(data.name && data.password)) res.sendStatus(401)
  else {
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
      if (error.message === 'Invalid password') res.sendStatus(403)
      else if (error.message === `User ${data.name} don't exist`) res.sendStatus(404)
      else res.status(500).send(error)
    }
  }
}
// NECESITO EL TOKEN Y EL NAME EN EL BODY
controllerUser.token = async (req, res) => {
  const data = req.body
  const refreshToken = data.token
  try {
    if (typeof refreshToken === 'undefined' || refreshToken === null) {
      throw (new Error('RefreshToken missing'))
    }
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
    if (error.message === 'RefreshToken missing') res.sendStatus(401)
    else if (error.message === 'Forbiden') res.sendStatus(403)
    else res.status(500).send(error)
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
