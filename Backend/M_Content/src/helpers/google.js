import { BUCKET_NAME_CONTENT, BUCKET_NAME_USERS, GOOGLE_KEYFILE_BUCKET_PATH } from '../config.js'
import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  // EN EL FUTURO AÑADIR PARAMETRO DEL NOMBRE DEL PROYECTO
  keyFilename: GOOGLE_KEYFILE_BUCKET_PATH
})

const bucketContent = storage.bucket(BUCKET_NAME_CONTENT)
const bucketUser = storage.bucket(BUCKET_NAME_USERS)

async function uploadFileUser (file, fileName) {
  const options = {
    gzip: true
  }
  const blob = bucketUser.file(fileName)
  const blobStream = blob.createWriteStream(options)

  blobStream.on('finish', () => {
    console.log(`File ${fileName} uploaded`)
  })
  blobStream.end(file.data)
}

async function deleteFileUser (fileName) {
  await bucketUser.file(`${fileName}`).delete()
  console.log(`File ${fileName} deleted`)
}

function getPublicURLUser (fileName) {
  const result = bucketUser.file(`${fileName}`).publicUrl()
  return result
}

async function uploadFileContent (file, dir) {
  const options = {
    gzip: true
  }
  const blob = bucketContent.file(`${dir}/${file.name}`)
  const blobStream = blob.createWriteStream(options)

  blobStream.on('finish', () => {
    console.log(`File ${dir}/${file.name} uploaded`)
  })
  blobStream.end(file.data)
}

async function deleteFileContent (fileName, dir) {
  await bucketContent.file(`${dir}/${fileName}`).delete()
  console.log(`File ${dir}/${fileName} deleted`)
}

function getPublicURLContent (fileName, dir) {
  const url = bucketContent.file(`${dir}/${fileName}`).publicUrl()
  const result = url.replace('%2F', '/')
  return result
}

export {
  uploadFileContent,
  deleteFileContent,
  getPublicURLContent,
  uploadFileUser,
  deleteFileUser,
  getPublicURLUser
}
