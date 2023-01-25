import fetch, { Headers } from 'node-fetch'
import { M_USERS_HOST_DNS } from '../config.js'

export function getUserAuthenticated (token) {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', token)
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }
  return fetch(`http://${M_USERS_HOST_DNS}/users`, requestOptions)
    .then(res => res.json())
}

export function getUserById (userId) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }
  return fetch(`http://${M_USERS_HOST_DNS}/users/${userId}`, requestOptions)
    .then(res => res.json())
}

export async function logIn (userName, userPassword) {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    const raw = JSON.stringify({
      name: userName,
      password: userPassword
    })
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    const result = await fetch(`http://${M_USERS_HOST_DNS}/users/login`,
      requestOptions)
      .then(async response => {
        if (response.status !== 200) return { error: true, errorName: await response.text() }
        else return response.json()
      })
    console.log('RESULT: ', result)
    return result
  } catch (error) {
    return error
  }
}

export async function refreshToken (userName, userT, userRT) {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      name: userName,
      accessToken: userT,
      refreshToken: userRT
    })
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    const result = await fetch(`http://${M_USERS_HOST_DNS}/token`, requestOptions)
      .then(async response => {
        if (response.status !== 200) return { error: true, errorName: await response.text(), status: response.status }
        else return response.json()
      })
    return result
  } catch (error) {
    console.log(error)
    return error
  }
}
