import { Sequelize } from 'sequelize'
import database from '../helpers/sequelize.js'

const User = database.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  proUser: {
    type: Sequelize.BOOLEAN
  },
  proDate: Sequelize.DATE,
  numMonthsPro: Sequelize.INTEGER,
  refreshToken: Sequelize.STRING,
  publicUrl: Sequelize.STRING,
  profilePicture: Sequelize.STRING
})

export default User
