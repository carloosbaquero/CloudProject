if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv')
  const { fileURLToPath } = await import('node:url')
  const path = await import('node:path')
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename).slice(0, -4)
  dotenv.config({ path: path.resolve(__dirname, '.env.' + process.env.NODE_ENV) })
}

export const NODE_ENV = process.env.NODE_ENV || 'development'
export const PORT = process.env.PORT || 3001
export const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost'
export const DATABASE_PORT = process.env.DATABASE_PORT || 3306
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'user'
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'password'
export const DATABASE_NAME = process.env.DATABASE_NAME || 'socialcontent'
export const DATABASE_DIALECT = process.env.DATABASE_DIALECT || 'mariadb'
export const BUCKET_NAME = process.env.BUCKET_NAME
export const GOOGLE_KEYFILE = process.env.GOOGLE_KEYFILE
