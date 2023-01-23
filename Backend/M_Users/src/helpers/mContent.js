import fetch from 'node-fetch'
import { M_CONTENT_HOST } from '../config.js'

export function deleteAllCommentsUser (userId) {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  }
  return fetch(`${M_CONTENT_HOST}/comments/users/${userId}`, requestOptions)
    .then(res => res.text())
}

export function deleteAllContentUser (userId) {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  }
  return fetch(`${M_CONTENT_HOST}/contents/users/${userId}`, requestOptions)
    .then(res => res.text())
}

export function deleteAllContentFilesUser (userId) {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  }
  return fetch(`${M_CONTENT_HOST}/contents/users/file/${userId}`, requestOptions)
    .then(res => res.text())
}
