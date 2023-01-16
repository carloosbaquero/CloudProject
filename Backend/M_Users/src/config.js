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
