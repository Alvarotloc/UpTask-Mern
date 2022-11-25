import express from 'express'

import {
  registrarUsuario,
  autenticarUsuario
} from '../controllers/usuarioController.js'

const router = express.Router()

// Autenticación, Registro y Confirmación de Usuarios

router.post('/', registrarUsuario)
router.post('/login', autenticarUsuario)

export default router
