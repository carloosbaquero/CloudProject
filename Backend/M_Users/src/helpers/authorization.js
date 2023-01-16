import jsonwebtoken from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from '../config.js'

export default function generateAccessToken (user) {
  return jsonwebtoken.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
}
