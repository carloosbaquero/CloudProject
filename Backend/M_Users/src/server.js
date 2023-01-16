import express from 'express'
import cors from 'cors'
import { PORT } from './config.js'
import routesUser from './routes/routesUser.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.listen(PORT, () => {
  console.log(`App User MicroService listening on http://localhost:${PORT}`)
})

app.use(routesUser)
