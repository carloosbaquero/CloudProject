if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv')
  const { fileURLToPath } = await import('node:url')
  const path = await import('node:path')
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename).slice(0, -4)
  dotenv.config({ path: path.resolve(__dirname, '.env.' + process.env.NODE_ENV) })
}

export const NODE_ENV = process.env.NODE_ENV || 'development'
export const PORT = process.env.PORT || 3002
export const KUBERNETES_DATABASE_HOST = process.env.KUBERNETES_DATABASE_HOST || 'localhost'
export const KUBERNETES_DATABASE_PORT = process.env.KUBERNETES_DATABASE_PORT || 3306
export const KUBERNETES_DATABASE_USERNAME = process.env.KUBERNETES_DATABASE_USERNAME || 'user'
export const KUBERNETES_DATABASE_PASSWORD = process.env.KUBERNETES_DATABASE_PASSWORD || 'password'
export const KUBERNETES_DATABASE_NAME = process.env.KUBERNETES_DATABASE_NAME || 'free_space_users'
export const KUBERNETES_DATABASE_DIALECT = process.env.KUBERNETES_DATABASE_DIALECT || 'mariadb'
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
export const TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME || '30m'
export const BUCKET_NAME_USERS = process.env.BUCKET_NAME_USERS
export const GOOGLE_KEYFILE_BUCKET_PATH = process.env.GOOGLE_KEYFILE_BUCKET_PATH
export const M_CONTENT_HOST = 'http://' + process.env.M_CONTENT_HOST || 'http://localhost'
export const M_CONTENT_PORT = process.env.M_CONTENT_PORT || '3001'
