import express from 'express'

import {
  registrarUsuario,
  autenticarUsuario,
  confirmarUsuario
} from '../controllers/usuarioController.js'

const router = express.Router()

// Autenticación, Registro y Confirmación de Usuarios

router.post('/', registrarUsuario)
router.post('/login', autenticarUsuario)

router.get('/confirmar/:token', confirmarUsuario)

export default router
