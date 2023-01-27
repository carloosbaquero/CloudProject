
export function checkNameExtensionContent (contentType, name) {
  const extensionsAllowed = contentType === 'image'
    ? ['jpg', 'png']
    : ['mp4']
  const extension = name.split('.').pop()
  return extensionsAllowed.some(ext => ext === extension)
}

export function requestType (requestPath) {
  const pathElements = requestPath.split('/')
  console.log(pathElements)
  return pathElements[1]
}

export function sortContentWithUsers (elementLeft, elementRigh) {
  let result = 0
  if (elementLeft.proUser > elementRigh.proUser) result = -1
  else if (elementLeft.proUser < elementRigh.proUser) result = 1
  else {
    if (elementLeft.createdAt > elementRigh.createdAt) result = -1
    else if (elementLeft.createdAt < elementRigh.createdAt) result = 1
  }
  return result
}

export function checkString (arrayStrings) {
  let result = false
  for (const str of arrayStrings) {
    if (!str?.trim()) {
      result = true
      break
    }
  }
  return result
}
