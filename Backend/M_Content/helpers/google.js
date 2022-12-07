import { BUCKET_NAME, GOOGLE_KEYFILE } from '../config.js'
import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  // EN EL FUTURO AÑADIR PARAMETRO DEL NOMBRE DEL PROYECTO
  keyFilename: GOOGLE_KEYFILE
})

const bucket = storage.bucket(BUCKET_NAME)

async function uploadImage (image) {
  try {
    const options = {
      resumable: false,
      gzip: true
    }
    const blob = bucket.file(image.name)
    const blobStream = blob.createWriteStream(options)

    blobStream.on('finish', () => {
      console.log('Success')
    })
    blobStream.end(image.data)
  } catch (error) {
    console.error(error)
  }
}

export { uploadImage }
