
export function checkNameExtensionContent (contentType, name) {
  const extensionsAllowed = contentType === 'image'
    ? ['jpg', 'png']
    : ['mp4']
  const extension = name.split('.').pop()
  return extensionsAllowed.some(ext => ext === extension)
}

export function requestType (requestPath) {
  const pathElements = requestPath.split('/')
  return pathElements[1]
}
