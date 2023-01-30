import fetch, { Headers } from 'node-fetch'
import { M_USERS_HOST_DNS } from '../config.js'

export async function createUser (body) {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    const raw = JSON.stringify({
      name: body.name,
      password: body.password,
      email: body.email
    })
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    const result = await fetch(`http://${M_USERS_HOST_DNS}/users`, requestOptions)
      .then(async response => {
        if (!response.ok) {
          return { error: true, errorMessage: await response.text(), errorStatus: response.status }
        }
        return { error: false }
      })
    return result
  } catch (error) {
    return error
  }
}

export async function deleteProfileFile (token) {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', token)
    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    }
    const result = await fetch(`http://${M_USERS_HOST_DNS}/profile`, requestOptions)
      .then(async response => {
        if (!response.ok) {
          return { error: true, errorMessage: await response.text(), errorStatus: response.status }
        }
        return { error: false }
      })
    return result
  } catch (error) {
    return error
  }
}

export async function saveProfileFile (body, token) {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', token)
    myHeaders.append('Content-Type', 'application/json')
    const raw = JSON.stringify({
      fileName: body.fileName
    })
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    const result = await fetch(`http://${M_USERS_HOST_DNS}/profile`, requestOptions)
      .then(async response => {
        if (!response.ok) {
          return { error: true, errorMessage: await response.text(), errorStatus: response.status }
        }
        return { error: false }
      })
    return result
  } catch (error) {
    return error
  }
}

export async function updateUserAuthenticated (body, token) {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', token)
    myHeaders.append('Content-Type', 'application/json')
    const raw = JSON.stringify({
      email: body.email
    })
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    const result = await fetch(`http://${M_USERS_HOST_DNS}/users`, requestOptions)
      .then(async response => {
        if (!response.ok) {
          return { error: true, errorMessage: await response.text(), errorStatus: response.status }
        }
        return { error: false }
      })
    return result
  } catch (error) {
    return error
  }
}

export async function deleteUserAuthenticated (token) {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', token)
    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    }
    const result = await fetch(`http://${M_USERS_HOST_DNS}/users`, requestOptions)
      .then(async response => {
        if (!response.ok) {
          return { error: true, errorMessage: await response.text(), errorStatus: response.status }
        }
        return { error: false }
      })
    return result
  } catch (error) {
    return error
  }
}

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

export async function deleteUserById (id) {
  try {
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    }
    const result = await fetch(`http://${M_USERS_HOST_DNS}/users/${id}`, requestOptions)
      .then(async response => {
        if (!response.ok) {
          return { error: true, errorMessage: await response.text(), errorStatus: response.status }
        }
        return { error: false }
      })
    return result
  } catch (error) {
    return error
  }
}

export function getUserById (userId) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }
  return fetch(`http://${M_USERS_HOST_DNS}/users/${userId}`, requestOptions)
    .then(res => res.json())
}

export async function updateUserPro (body, token) {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Authorization', token)
    const raw = JSON.stringify({
      numMonths: body.numMonths
    })
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    const result = await fetch(`http://${M_USERS_HOST_DNS}/users/pro`, requestOptions)
      .then(async response => {
        if (!response.ok) {
          return { error: true, errorMessage: await response.text(), errorStatus: response.status }
        }
        return { error: false }
      })
    return result
  } catch (error) {
    return error
  }
}

export async function checkProUser (token) {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', token)
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow'
    }
    const result = await fetch(`http://${M_USERS_HOST_DNS}/users/pro/check`, requestOptions)
      .then(async response => {
        if (!response.ok) {
          return { error: true, errorMessage: await response.text(), errorStatus: response.status }
        }
        return { error: false, message: await response.text() }
      })
    return result
  } catch (error) {
    return error
  }
}

export function getAllUsers () {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }
  return fetch(`http://${M_USERS_HOST_DNS}/users/index`, requestOptions)
    .then(res => res.json())
}

export async function logIn (body) {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    const raw = JSON.stringify({
      name: body.name,
      password: body.password
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
        if (response.status !== 200) return { error: true, errorName: await response.text(), errorStatus: response.status }
        else return response.json()
      })
    return result
  } catch (error) {
    return error
  }
}

export async function logOut (token) {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', token)
    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    }
    const result = await fetch(`http://${M_USERS_HOST_DNS}/users/logout`,
      requestOptions)
      .then(async response => {
        if (!response.ok) return { error: true, errorName: await response.text(), errorStatus: response.status }
        else return { error: false }
      })
    return result
  } catch (error) {
    return error
  }
}

export async function refreshToken (body) {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      name: body.name,
      accessToken: body.accessToken,
      refreshToken: body.refreshToken
    })
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    const result = await fetch(`http://${M_USERS_HOST_DNS}/token`, requestOptions)
      .then(async response => {
        if (!response.ok) return { error: true, errorName: await response.text(), errorStatus: response.status }
        else return response.json()
      })
    return result
  } catch (error) {
    return error
  }
}
