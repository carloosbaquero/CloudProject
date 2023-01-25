import { logIn, refreshToken } from '../helpers/mUsers.js'

const controllerUser = {}

controllerUser.logIn = async (req, res) => {
  const data = req.body
  try {
    const userName = data?.name
    const userPassword = data?.password
    if (typeof userName !== 'string' || typeof userPassword !== 'string') throw new Error('Incorrect body')
    const result = await logIn(userName, userPassword)
    if (result?.error) throw new Error(result.errorName)
    console.log(result)
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    console.log('message: ', error.message)
    if (error.message === 'Invalid password') res.status(403).send('Invalid password')
    else if (error.message === 'Incorrect body') res.status(401).send('Incorrect body')
    else if (error.message === `User ${data.name} don't exist`) res.status(404).send(`User ${data.name} don't exist`)
    else res.status(500).send(error)
  }
}

controllerUser.refreshToken = async (req, res) => {
  const data = req.body
  try {
    const userName = data?.name
    const userT = data?.accessToken
    const userRT = data?.refreshToken
    if (typeof userName !== 'string' || typeof userT !== 'string' || typeof userRT !== 'string') throw new Error('Incorrect body')
    const result = await refreshToken(userName, userT, userRT)
    if (result?.error) throw new Error(result.errorName, { cause: result.status })
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    console.log('status: ', error.cause)
    if (error.message === 'Incorrect body') res.status(401).send('Incorrect body')
    else if (error.status !== 500) res.status(Number(error.cause)).send(error.message)
    else res.status(500).send(error)
  }
}

export default controllerUser
