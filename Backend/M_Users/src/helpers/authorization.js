import jsonwebtoken from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET, TOKEN_EXPIRATION_TIME } from '../config.js'

export default function generateAccessToken (user) {
  return jsonwebtoken.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME })
}
