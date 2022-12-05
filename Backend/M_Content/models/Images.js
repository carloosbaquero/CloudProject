import { Sequelize } from 'sequelize'
import { initDatabase } from '../config/sequelize.js'

const Images = initDatabase.define('images', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  description: Sequelize.STRING,
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    default: new Date()
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    default: new Date()
  }
})

export { Images }
