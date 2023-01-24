import fetch from 'node-fetch'
import { M_CONTENT_HOST, M_CONTENT_PORT } from '../config.js'

export function deleteAllCommentsUser (userId) {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  }
  return fetch(`${M_CONTENT_HOST}:${M_CONTENT_PORT}/comments/users/${userId}`, requestOptions)
    .then(res => res.text())
}

export function deleteAllContentUser (userId) {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  }
  return fetch(`${M_CONTENT_HOST}:${M_CONTENT_PORT}/contents/users/${userId}`, requestOptions)
    .then(res => res.text())
}

export function deleteAllContentFilesUser (userId) {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  }
  return fetch(`${M_CONTENT_HOST}:${M_CONTENT_PORT}/contents/users/file/${userId}`,
    requestOptions)
    .then(res => res.text())
}
