import { Sequelize } from 'sequelize'
import { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } from './config.js'

const initDatabase = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  dialect: 'mariadb'
})

initDatabase.sync()

export { initDatabase }
