import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import conectarDB from './config/dbconfig.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'

const app = express()

app.use(express.json())

const whiteList = [
  'http://localhost:5173'
]

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Error de cors'))
    }
  }
}

app.use(cors(corsOptions))

dotenv.config()

conectarDB()

// Routing

app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
