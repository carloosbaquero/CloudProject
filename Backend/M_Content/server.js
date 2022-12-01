const express = require('express')
const upload = require('express-fileupload')
const cors = require('cors')
const dotenv = require('dotenv')

const PORT = process.env.PORT || 3000

dotenv.config()

const app = express()

app.use(upload())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.listen(PORT, () => {
  console.log(`App Content MicroService listening on port: ${PORT}`)
})