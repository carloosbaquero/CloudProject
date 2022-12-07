import { Sequelize } from 'sequelize'
import database from '../helpers/sequelize.js'

const Comments = database.define('commets', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imageId: Sequelize.INTEGER,
  videoId: Sequelize.INTEGER
})

export default Comments
