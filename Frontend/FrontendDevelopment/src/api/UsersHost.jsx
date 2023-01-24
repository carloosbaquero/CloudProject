<<<<<<< HEAD
export const M_USERS = host.minikube.internal + ':3002'
=======
const M_USERS_HOST = process.env.M_USERS_HOST
const M_USERS_PORT = process.env.M_USERS_PORT

export const M_USERS = `${M_USERS_HOST}:${M_USERS_PORT}`
>>>>>>> 4d5b4dcb17aeafc06372340c1cf1506093c74eaf
