import { Sequelize } from 'sequelize'
import {
  KUBERNETES_DATABASE_NAME,
  KUBERNETES_DATABASE_USERNAME,
  KUBERNETES_DATABASE_PASSWORD,
  KUBERNETES_DATABASE_PORT,
  KUBERNETES_DATABASE_HOST,
  KUBERNETES_DATABASE_DIALECT
} from '../config.js'

const database = new Sequelize(KUBERNETES_DATABASE_NAME,
  KUBERNETES_DATABASE_USERNAME,
  KUBERNETES_DATABASE_PASSWORD, {
    host: KUBERNETES_DATABASE_HOST,
    port: KUBERNETES_DATABASE_PORT,
    dialect: KUBERNETES_DATABASE_DIALECT,
    logging: false
  })

database.sync({ force: true })

export default database
