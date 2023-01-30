import {
  checkProUser,
  createUser,
  deleteProfileFile,
  deleteUserAuthenticated,
  deleteUserById,
  getAllUsers,
  getUserAuthenticated,
  getUserById,
  logIn,
  logOut,
  refreshToken,
  saveProfileFile,
  updateUserAuthenticated,
  updateUserPro
} from '../helpers/mUsers.js'
import { checkString } from '../helpers/utilities.js'
import { deleteFileUser, uploadFileUser } from '../helpers/google.js'

const controllerUser = {}

controllerUser.createUser = async (req, res) => {
  try {
    if (checkString([req.body?.name, req.body?.password, req.body?.email])) throw new Error('Incorrect body')
    const result = await createUser(req.body)
    if (result?.error) throw new Error(result.errorMessage, { cause: result.errorStatus })
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    if (error.message === 'Incorrect body') res.status(401).send('Incorrect body')
    else if (error.cause !== 500) res.status(error.cause).send(error.message)
    else res.status(500).send(error)
  }
}

controllerUser.updateUser = async (req, res) => {
  try {
    if (checkString([req.body?.email])) throw new Error('Incorrect body')
    const result = await updateUserAuthenticated(req.body, req.headers.authorization)
    if (result?.error) throw new Error(result.errorMessage, { cause: result.errorStatus })
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    if (error.message === 'Incorrect body') res.status(401).send('Incorrect body')
    else if (error.cause !== 500) res.status(error.cause).send(error.message)
    else res.status(500).send(error)
  }
}

controllerUser.deleteAuthenticatedUser = async (req, res) => {
  try {
    const result = await deleteUserAuthenticated(req.headers.authorization)
    if (result?.error) throw new Error(result.errorMessage, { cause: result.errorStatus })
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    if (error.cause !== 500) res.status(error.cause).send(error.message)
    else res.status(500).send(error)
  }
}

controllerUser.getAuthenticatedUser = async (req, res) => {
  try {
    const result = await getUserAuthenticated(req.headers.authorization)
    if (result?.error) throw new Error(result.errorMessage, { cause: result.errorStatus })
    res.json(result)
  } catch (error) {
    console.error(error)
    if (error.cause !== 500) res.status(error.cause).send(error.message)
    else res.status(500).send(error)
  }
}

controllerUser.deleteUser = async (req, res) => {
  try {
    const result = await deleteUserById(req.params.id)
    if (result?.error) throw new Error(result.errorMessage, { cause: result.errorStatus })
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    if (error.cause !== 500) res.status(error.cause).send(error.message)
    else res.status(500).send(error)
  }
}

controllerUser.getUser = async (req, res) => {
  try {
    const result = await getUserById(req.params.id)
    if (result?.error) throw new Error(result.errorMessage, { cause: result.errorStatus })
    res.json(result)
  } catch (error) {
    console.error(error)
    if (error.cause !== 500) res.status(error.cause).send(error.message)
    else res.status(500).send(error)
  }
}

controllerUser.createProfilePicture = async (req, res) => {
  if (typeof req.files === 'undefined') res.status(401).send('The request must have an image to upload')
  else if (typeof req.files?.newFile === 'undefined') res.status(401).send('The file to upload must be in the field called image')
  else {
    try {
      const name = `${req.user.name}-${req.files.newFile.name}`
      await uploadFileUser(req.files.newFile, name)
      const result = await saveProfileFile({ fileName: name }, req.headers.authorization)
      if (result?.error) throw new Error(result.errorMessage, { cause: result.errorStatus })
      res.sendStatus(201)
    } catch (error) {
      console.error(error)
      if (error.cause !== 500) res.status(error.cause).send(error.message)
      else res.status(500).send(error)
    }
  }
}

controllerUser.updateProfilePicture = async (req, res) => {
  console.log(req.files)
  if (typeof req.files === 'undefined') res.status(401).send('The request must have an image to upload')
  else if (typeof req.files?.newFile === 'undefined') res.status(401).send('The file to upload must be in the field called image')
  else {
    try {
      const user = await getUserAuthenticated(req.headers.authorization)
      const oldFileName = user.profilePicture
      const newFileName = `${req.user.name}-${req.files.newFile.name}`
      await deleteFileUser(oldFileName)
      await uploadFileUser(req.files.newFile, newFileName)
      const result = await saveProfileFile({ fileName: newFileName }, req.headers.authorization)
      if (result?.error) throw new Error(result.errorMessage, { cause: result.errorStatus })
      res.sendStatus(204)
    } catch (error) {
      console.error(error)
      if (error.cause !== 500) res.status(error.cause).send(error.message)
      else res.status(500).send(error)
    }
  }
}

controllerUser.deleteProfilePicture = async (req, res) => {
  try {
    const user = await getUserAuthenticated(req.headers.authorization)
    const fileName = user.profilePicture
    await deleteFileUser(fileName)
    const result = await deleteProfileFile(req.headers.authorization)
    if (result?.error) throw new Error(result.errorMessage, { cause: result.errorStatus })
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    if (error.cause !== 500) res.status(error.cause).send(error.message)
    else res.status(500).send(error)
  }
}

controllerUser.updateUserPro = async (req, res) => {
  try {
    if (typeof req.body?.numMonths !== 'number') throw new Error('Incorrect body')
    const result = await updateUserPro(req.body, req.headers.authorization)
    if (result?.error) throw new Error(result.errorMessage, { cause: result.errorStatus })
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    if (error.message === 'Incorrect body') res.status(401).send('Incorrect body')
    else if (error.cause !== 500) res.status(error.cause).send(error.message)
    else res.status(500).send(error)
  }
}

controllerUser.checkUserPro = async (req, res) => {
  try {
    const result = await checkProUser(req.headers.authorization)
    if (result?.error) throw new Error(result.errorMessage, { cause: result.errorStatus })
    res.send(result.message)
  } catch (error) {
    console.error(error)
    if (error.cause !== 500) res.status(error.cause).send(error.message)
    else res.status(500).send(error)
  }
}

controllerUser.getAllUsers = async (req, res) => {
  try {
    const result = await getAllUsers()
    res.json(result)
  } catch (error) {
    console.error(error)
    if (error.cause !== 500) res.status(error.cause).send(error.message)
    else res.status(500).send(error)
  }
}

controllerUser.logIn = async (req, res) => {
  try {
    if (checkString([req.body?.name, req.body?.password])) throw new Error('Incorrect body')
    const result = await logIn(req.body)
    if (result?.error) throw new Error(result.errorMessage, { cause: result.errorStatus })
    res.json(result)
  } catch (error) {
    console.error(error)
    if (error.message === 'Incorrect body') res.status(401).send('Incorrect body')
    else if (error.cause !== 500) res.status(error.cause).send(error.message)
    else res.status(500).send(error)
  }
}

controllerUser.logOut = async (req, res) => {
  try {
    const result = await logOut(req.headers.authorization)
    if (result?.error) throw new Error(result.errorMessage, { cause: result.errorStatus })
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    if (error.cause !== 500) res.status(error.cause).send(error.message)
    else res.status(500).send(error)
  }
}

controllerUser.refreshToken = async (req, res) => {
  try {
    if (checkString([req.body?.name, req.body?.accessToken, req.body?.refreshToken])) throw new Error('Incorrect body')
    const result = await refreshToken(req.body)
    if (result?.error) throw new Error(result.errorMessage, { cause: result.errorStatus })
    res.json(result)
  } catch (error) {
    console.error(error)
    if (error.message === 'Incorrect body') res.status(401).send('Incorrect body')
    else if (error.cause !== 500) res.status(error.cause).send(error.message)
    else res.status(500).send(error)
  }
}

export default controllerUser
