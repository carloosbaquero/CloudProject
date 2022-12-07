import express from 'express'
import upload from 'express-fileupload'
import cors from 'cors'
import { PORT } from './config.js'
import routesImages from './routes/routesImage.js'
import routesVideos from './routes/routesVideo.js'
import routesComments from './routes/routesComment.js'

const app = express()

app.use(upload())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.listen(PORT, () => {
  console.log(`App Content MicroService listening on http://localhost:${PORT}`)
})

app.use(routesImages)
app.use(routesVideos)
app.use(routesComments)
