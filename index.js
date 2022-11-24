import express from 'express'
import dotenv from 'dotenv'

import conectarDB from './config/dbconfig.js'

const app = express()

dotenv.config()

conectarDB()

app.get('/', (req, res) => {
  res.send('hola')
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
