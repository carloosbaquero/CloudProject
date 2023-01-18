import fetch, { Headers } from 'node-fetch'
import { M_USERS_HOST } from '../config.js'

export function getUserAuthenticated (token) {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }
  return fetch(`${M_USERS_HOST}/users`, requestOptions)
    .then(res => res.json())
}

export function getUserById (userId) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }
  return fetch(`${M_USERS_HOST}/users/${userId}`, requestOptions)
    .then(res => res.json())
}
