import { Sequelize } from 'sequelize'
import {
  GOOGLE_DATABASE_NAME,
  GOOGLE_DATABASE_USERNAME,
  GOOGLE_DATABASE_PASSWORD,
  GOOGLE_DATABASE_PORT,
  GOOGLE_DATABASE_HOST,
  GOOGLE_DATABASE_DIALECT
} from '../config.js'

const database = new Sequelize(GOOGLE_DATABASE_NAME,
  GOOGLE_DATABASE_USERNAME,
  GOOGLE_DATABASE_PASSWORD, {
    host: GOOGLE_DATABASE_HOST,
    port: GOOGLE_DATABASE_PORT,
    dialect: GOOGLE_DATABASE_DIALECT,
    logging: false
  })

database.sync({ force: true })

export default database
