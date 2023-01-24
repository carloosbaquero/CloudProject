import { BUCKET_NAME_USERS, GOOGLE_KEYFILE_BUCKET_PATH } from '../config.js'
import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  // EN EL FUTURO AÑADIR PARAMETRO DEL NOMBRE DEL PROYECTO
  keyFilename: GOOGLE_KEYFILE_BUCKET_PATH
})

const bucket = storage.bucket(BUCKET_NAME_USERS)

async function uploadFile (file, fileName) {
  const options = {
    gzip: true
  }
  const blob = bucket.file(fileName)
  const blobStream = blob.createWriteStream(options)

  blobStream.on('finish', () => {
    console.log(`File ${fileName} uploaded`)
  })
  blobStream.end(file.data)
}

async function deleteFile (fileName) {
  await bucket.file(`${fileName}`).delete()
  console.log(`File ${fileName} deleted`)
}

function getPublicURL (fileName) {
  const result = bucket.file(`${fileName}`).publicUrl()
  return result
}

export { uploadFile, deleteFile, getPublicURL }
