import { Sequelize } from 'sequelize'
import database from '../helpers/sequelize.js'

const SocialContent = database.define('socialcontents', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contentType: {
    type: Sequelize.ENUM,
    values: ['image', 'video'],
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: Sequelize.TEXT,
  publicURL: Sequelize.STRING
})

export default SocialContent
