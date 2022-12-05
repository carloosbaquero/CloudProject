import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3001
export const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost'
export const DATABASE_PORT = process.env.DATABASE_PORT || 3306
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'iissi_user'
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'iissi$user'
export const DATABASE_NAME = process.env.DATABASE_NAME || 'socialcontent'
