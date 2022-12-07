import { Sequelize } from 'sequelize'
import { database } from '../helpers/sequelize.js'

const Images = database.define('images', {
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

export { Images }
