import { M_USERS_HOST_DNS } from '../config.js'

const controllerUser = {}

controllerUser.createUser = async (req, res) => {
  res.redirect(307, `http://${M_USERS_HOST_DNS}/users`)
}

controllerUser.updateUser = async (req, res) => {
  res.redirect(307, `http://${M_USERS_HOST_DNS}/users`)
}

controllerUser.deleteAuthenticatedUser = async (req, res) => {
  res.redirect(307, `http://${M_USERS_HOST_DNS}/users`)
}

controllerUser.getAuthenticatedUser = async (req, res) => {
  res.redirect(307, `http://${M_USERS_HOST_DNS}/users`)
}

controllerUser.deleteUser = async (req, res) => {
  res.redirect(307, `http://${M_USERS_HOST_DNS}/users/${req.params.id}`)
}

controllerUser.getUser = async (req, res) => {
  res.redirect(307, `http://${M_USERS_HOST_DNS}/users/${req.params.id}`)
}

controllerUser.createProfilePicture = async (req, res) => {
  res.redirect(307, `http://${M_USERS_HOST_DNS}/profile`)
}

controllerUser.updateProfilePicture = async (req, res) => {
  res.redirect(307, `http://${M_USERS_HOST_DNS}/profile`)
}

controllerUser.deleteProfilePicture = async (req, res) => {
  res.redirect(307, `http://${M_USERS_HOST_DNS}/profile`)
}

controllerUser.updateUserPro = async (req, res) => {
  res.redirect(307, `http://${M_USERS_HOST_DNS}/users/pro`)
}

controllerUser.checkUserPro = async (req, res) => {
  res.redirect(307, `http://${M_USERS_HOST_DNS}/users/pro/check`)
}

controllerUser.getAllUsers = async (req, res) => {
  res.redirect(307, `http://${M_USERS_HOST_DNS}/users/index`)
}

controllerUser.logIn = async (req, res) => {
  res.redirect(307, `http://${M_USERS_HOST_DNS}/users/login`)
}

controllerUser.logOut = async (req, res) => {
  res.redirect(307, `http://${M_USERS_HOST_DNS}/users/logout`)
}

controllerUser.refreshToken = async (req, res) => {
  res.redirect(307, `http://${M_USERS_HOST_DNS}/token`)
}

export default controllerUser
