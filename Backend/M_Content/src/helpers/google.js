import { BUCKET_NAME, GOOGLE_KEYFILE } from '../config.js'
import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  // EN EL FUTURO AÑADIR PARAMETRO DEL NOMBRE DEL PROYECTO
  keyFilename: GOOGLE_KEYFILE
})

const bucket = storage.bucket(BUCKET_NAME)

async function uploadFile (file, dir) {
  const options = {
    gzip: true
  }
  const blob = bucket.file(`${dir}/${file.name}`)
  const blobStream = blob.createWriteStream(options)

  blobStream.on('finish', () => {
    console.log(`File ${dir}/${file.name} uploaded`)
  })
  blobStream.end(file.data)
}

async function deleteFile (fileName, dir) {
  await bucket.file(`${dir}/${fileName}`).delete()
  console.log(`File ${dir}/${fileName} deleted`)
}

function getPublicURL (fileName, dir) {
  const url = bucket.file(`${dir}/${fileName}`).publicUrl()
  const result = url.replace('%2F', '/')
  return result
}

export { uploadFile, deleteFile, getPublicURL }
