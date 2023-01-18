import jsonwebtoken from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from '../config.js'

const middlewareContent = {}

middlewareContent.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (typeof token === 'undefined') return res.sendStatus(401)
  jsonwebtoken.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

export default middlewareContent
