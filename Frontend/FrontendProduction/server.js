const express = require('express')

const app = express()

app.get('/', express.static(__dirname + '/dist'))

app.listen(80, () => {
  console.log('estoy escuchando por el purto 80')
})

