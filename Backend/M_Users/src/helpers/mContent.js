import fetch from 'node-fetch'
import { M_CONTENT_HOST_DNS } from '../config.js'

export function deleteAllCommentsUser (userId) {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  }
  return fetch(`http://${M_CONTENT_HOST_DNS}/api/comments/users/${userId}`, requestOptions)
    .then(res => res.text())
}

export function deleteAllContentUser (userId) {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  }
  return fetch(`http://${M_CONTENT_HOST_DNS}/api/contents/users/${userId}`, requestOptions)
    .then(res => res.text())
}

export function deleteAllContentFilesUser (userId) {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  }
  return fetch(`http://${M_CONTENT_HOST_DNS}/api/contents/users/file/${userId}`,
    requestOptions)
    .then(res => res.text())
}
