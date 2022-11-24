import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('hola')
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
