import { Sequelize } from 'sequelize'
import database from '../helpers/sequelize.js'

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
  proUser: Sequelize.BOOLEAN
})

export default Videos
