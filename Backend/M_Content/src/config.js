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
export const GOOGLE_DATABASE_HOST = process.env.GOOGLE_DATABASE_HOST || 'localhost'
export const GOOGLE_DATABASE_PORT = process.env.GOOGLE_DATABASE_PORT || 3306
export const GOOGLE_DATABASE_USERNAME = process.env.GOOGLE_DATABASE_USERNAME || 'user'
export const GOOGLE_DATABASE_PASSWORD = process.env.GOOGLE_DATABASE_PASSWORD || 'password'
export const GOOGLE_DATABASE_NAME = process.env.GOOGLE_DATABASE_NAME || 'free_space_content'
export const GOOGLE_DATABASE_DIALECT = process.env.GOOGLE_DATABASE_DIALECT || 'mariadb'
export const BUCKET_NAME_CONTENT = process.env.BUCKET_NAME_CONTENT
export const GOOGLE_KEYFILE_BUCKET = process.env.GOOGLE_KEYFILE_BUCKET
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
export const M_USERS_HOST = process.env.M_USERS_HOST || 'http://localhost'
export const M_USERS_PORT = process.env.M_USERS_PORT || '3002'
