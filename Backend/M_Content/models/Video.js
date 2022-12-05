import { Sequelize } from 'sequelize'
import { database } from '../config/sequelize.js'

const Videos = database.define('videos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  userId: Sequelize.INTEGER,
  description: Sequelize.TEXT,
  proUSer: Sequelize.BOOLEAN
})

export { Videos }
