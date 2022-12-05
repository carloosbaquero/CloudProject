import express from 'express'
import upload from 'express-fileupload'
import cors from 'cors'
import { PORT } from './config/config.js'
import { routesTest } from './routes/routesTest.js'
import { routesImages } from './routes/routesImage.js'

const app = express()

app.use(upload())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.listen(PORT, () => {
  console.log(`App Content MicroService listening on port: ${PORT}`)
})

app.use('/test', routesTest)
app.use(routesImages)
