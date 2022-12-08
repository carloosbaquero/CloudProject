import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ paht: path.resolve(__dirname, '/..', '/.env') })

export const PORT = process.env.PORT || 3001
export const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost'
export const DATABASE_PORT = process.env.DATABASE_PORT || 3306
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'iissi_user'
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'iissi$user'
export const DATABASE_NAME = process.env.DATABASE_NAME || 'socialcontent'
export const BUCKET_NAME = process.env.BUCKET_NAME
export const GOOGLE_KEYFILE = process.env.GOOGLE_KEYFILE
